FROM node:10.1.0

ENV WWW=/usr/src/app

# Create a directory where our app will be placed
RUN mkdir -p $WWW

# Change directory so that our commands run inside this new directory
ADD . $WWW
WORKDIR $WWW

# Install dependecies
RUN npm install
#ENV NODE_PATH=/usr/src/api/node_modules

ENV PORT 8800
EXPOSE $PORT

# Serve the app
CMD ["npm", "start"]
