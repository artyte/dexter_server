FROM node:13.12.0-alpine as backend
WORKDIR /app
COPY . .
RUN yarn
EXPOSE 3000
CMD ["yarn", "start"]