# Stage 1: Build the app
FROM node:18-alpine AS build

WORKDIR /app

# Copy only package.json and yarn.lock to leverage Docker cache for dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the entire project, except node_modules and other unneeded files
COPY . .

# Build the NestJS application
RUN yarn run build

# Stage 2: Production Image
FROM node:18-alpine

WORKDIR /app

# Copy the build files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/yarn.lock ./

# Ensure correct file ownership and permissions (especially if using non-root containers)
RUN chown -R node:node /app

# Switch to the node user to avoid running as root
USER node
# Expose the application port
EXPOSE 3000

# Set the command to run the app
CMD ["yarn", "start:dev"]

# Optional: Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s \
  CMD curl --fail http://localhost:3000/ || exit 1
