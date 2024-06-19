import dotenv from 'dotenv'

dotenv.config()

type TConfig = {
    [key: string]: EnvironmentConfig;
};

type EnvironmentConfig = {
	app: AppConfig;
	auth0: Auth0Config;
	cloudinary: CloudinaryConfig;
};

type AppConfig = {
	PORT: string | number;
};

type Auth0Config = {
	client_origin: string | undefined;
	audience: string | undefined;
	issuer: string | undefined;
}

type CloudinaryConfig = {
	cloudinary_name: string | undefined;
	cloudinary_api_key: string | undefined;
	cloudinary_api_secret: string | undefined;
};

if(process.env.NODE_ENV === 'production'){
    dotenv.config({path: '.env.production'});
} else {
    dotenv.config({path: '.env.development'})
}

const ENV = process.env.NODE_ENV ?? 'development';

const CONFIG: TConfig = {
	development: {
		app: {
			PORT: process.env.PORT || 8080,
		},
		auth0: {
			client_origin: process.env.APP_ORIGIN,
			audience: process.env.AUTH0_AUDIENCE,
			issuer: process.env.AUTH0_ISSUER
		},
		cloudinary: {

			cloudinary_name: process.env.CLOUDINARY_NAME,
			cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
			cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
		}
	},
	production: {
		app: {
			PORT: process.env.PORT || 8081,
		},
		auth0: {
			client_origin: process.env.APP_ORIGIN,
			audience: process.env.AUTH0_AUDIENCE,
			issuer: process.env.AUTH0_ISSUER
		},
		cloudinary: {

			cloudinary_name: process.env.CLOUDINARY_NAME,
			cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
			cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
		}
	},
};



export default CONFIG[ENV];