FROM node:12.0

ENV WWW=/usr/src/app

# Create a directory where our app will be placed
RUN mkdir -p $WWW

# Change directory so that our commands run inside this new directory
#ADD . $WWW
WORKDIR $WWW

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

ENV PORT 3000
EXPOSE $PORT

#RUN CMD npm rebuild node-sass

# Serve the app
CMD ["npm", "start"]
