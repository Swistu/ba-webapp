# Stage 1: The Builder
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: The Runner (Production)
FROM node:18-alpine AS runner

WORKDIR /app

# The environment variable is critical for Next.js in production
ENV NODE_ENV=production

# Copy the entire project folder to the runner, which contains the .next build output
COPY --from=builder /app .

# Expose the port the Next.js server will run on
EXPOSE 3000

# The command to start the application in production
# This runs 'next start', which is what 'npm start' would do.
CMD ["npm", "start"]