# Next Store Without CMS

A fully functional e-commerce application built with Next.js(NextTs/Express) designed to run without the need for a CMS. This project supports essential e-commerce functionalities, including Stripe payments and Google OAuth for authentication.

---

## Features

- **Next.js**: A fast and modern React-based framework.
- **Google OAuth**: Secure and seamless user authentication.
- **Stripe Integration**: Handle secure payments with ease.
- **Local Development**: Runs on `localhost:3000` for rapid iteration and testing.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v14 or newer)
- npm or yarn
- A Stripe account with API keys
- Google Cloud project for OAuth credentials

---

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd next-store-without-cms
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**:

   Create a `.env.local` file in the root directory with the following keys:

   ```env
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<your-stripe-public-key>
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Folder Structure

```
next-store-without-cms/
├── components/     # Reusable UI components
├── app/          # Application routes (Next.js routes)
├── public/         # Static assets (e.g., images, icons)
├── styles/         # Global and component-specific styles
├── utils/          # Utility functions
└── .env.local      # Environment variables
```

---

## Stripe Integration

To enable Stripe payments:

1. Create a Stripe account at [stripe.com](https://stripe.com).
2. Retrieve your API keys from the Stripe dashboard.
3. Add the keys to your `.env.local` file.
4. Use the Stripe library to create checkout sessions in the backend (see `pages/api/checkout.js`).

---

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project and enable the OAuth 2.0 API.
3. Generate a client ID and secret.
4. Add the credentials to your `.env.local` file.
5. Ensure your redirect URI matches `http://localhost:3000/api/auth/callback/google`.

---





---

## License

This project is licensed under the MIT License.

---

## Contributing

Contributions are welcome! Please open a pull request or issue to discuss any changes.

