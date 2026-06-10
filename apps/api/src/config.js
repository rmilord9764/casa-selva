import 'dotenv/config';
export const config = {
  port: process.env.PORT || 4000, databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET, clientUrl: process.env.CLIENT_URL,
  square: { accessToken: process.env.SQUARE_ACCESS_TOKEN, environment: process.env.SQUARE_ENV || 'sandbox',
    locationId: process.env.SQUARE_LOCATION_ID, webhookKey: process.env.SQUARE_WEBHOOK_SIGNATURE_KEY },
  sendgrid: { apiKey: process.env.SENDGRID_API_KEY, from: process.env.SENDGRID_FROM },
  property: { fullAddress: process.env.PROPERTY_ADDRESS, mapsUrl: process.env.PROPERTY_MAPS_URL },
};
