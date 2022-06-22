import React, {createContext, useContext} from 'react';
import { ApplicationContext } from './ApplicationContextProvider';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import createAuthRefreshInterceptor from 'axios-auth-refresh';




export const SecurityContext = createContext(null);

function SecurityContextProvider({children}) {
	const { signIn, signOut} = useContext(ApplicationContext);
	


	const protectedAxios = axios.create({
		baseURL: `http/localhost:8087/api`,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		
	});
	
	const publicAxios = axios.create({
		baseURL: `http://192.168.1.56:8087/api`,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});  	

	protectedAxios.interceptors.request.use(
		(config = {}) => {
			config.headers.Cookie = `accessToken=${accessToken};`
			if (!config.headers.Authorization) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		},
		error => {
			return Promise.reject(error);
		},
	)

	// Response interceptor for API calls
	protectedAxios.interceptors.response.use((response) => {
		return response
	}, async function (error) {
		const originalRequest = error.config;
		if ([401, 403].includes(error.response.status) && !originalRequest._retry) {
			/*
			originalRequest._retry = true;
			const newAccessToken = await refreshAccessToken();
			axios.defaults.headers.common['Cookie'] = `accessToken=${newAccessToken};`;
			axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
			return protectedAxios(originalRequest);

			 */
		}
		return Promise.reject(error);
	});

	const refreshAuthLogic = (failedRequest) => {
		publicAxios.post(
			"refresh-token",
			{refreshToken}
		)
			.then(response => {
				const {data} = response;
				if (data['accessToken']) {
					const decoded = jwt_decode<Profile>(accessToken);
					signIn({
						...decoded,
						accessToken: data['accessToken'],
						refreshToken: data['refreshToken'],
						location
					});
				}
				failedRequest.response.config.headers['Authorization'] = `Bearer ${data['accessToken']}`;
				return Promise.resolve();
			}).catch((e) => {
			signOut();
			return Promise.reject(e)
		});
	}

	const refreshAccessToken = async () => {
		try {
			const response = await publicAxios.post(
				"refresh-token",
				{refreshToken}
			);
			const {data} = response;
			if (accessToken) {
				const decoded = jwt_decode<Profile>(accessToken);
				signIn({...decoded, accessToken: data['accessToken'], refreshToken: data['refreshToken'], location});
			}
			return accessToken;
		} catch (e) {
			signOut();
		}
	};

	createAuthRefreshInterceptor(protectedAxios, refreshAuthLogic);

	return (
		<SecurityContext.Provider value={{publicAxios, protectedAxios}}>
			{children}
		</SecurityContext.Provider>
	);
}

export default SecurityContextProvider;
