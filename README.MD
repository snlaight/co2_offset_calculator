# CarbonCalc Quest - CO2 Offset Calculator

### Project Description

The CO2 Offset Calculator is a tool designed to estimate carbon dioxide emissions and suggest ways to offset them. This project aims to raise awareness about carbon footprints and promote environmentally friendly practices.

### Getting Started

Installation

1. Clone the repository

```
git clone https://github.com/snlaight/co2_offset_calculator.git
```

1. Navigate to the repository directory
2. Install dependencies

```
npm install
```

### Running the application

First, make sure you have filled in your environment variables, in a `.env` file, according to the `.env.example` file.

```
DATABASE_URL="postgres://user:password@db_url:port/db_name"
OPENAI_API_KEY=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=


DEBUG=trpc:*
```

To start the application, run:

```
npm start
```

### Technologies Used

- NextJS
- tRPC - as API layer
- TailwindCSS - for styling
- NextUI / Tremor - for prebuilt components that favor building dashboards in react
- Vitest - testing
- Prisma - ORM for database
- OpenAI - api for getting suggestions

## Open Topics:

- [ ] Finish testing environment setup and writing tests

- [ ] Implement AI Api
