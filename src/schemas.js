import { schema } from 'normalizr';


const userSchema = new schema.Entity('users', {
	idAttribute: user => user.user.id
});
const mediaSchema = new schema.Entity('media', {
	idAttribute: media => media.id
});
/*
const movieSchema = new schema.Entity('movies', {
	idAttribute: media => media.id
});
const seriesSchema = new schema.Entity('series', {
	idAttribute: media => media.id
});
const mediaSchema = new schema.Union({
	movies: movieSchema,
	series: seriesSchema
}, (input) => {
	if (input.type === 'series') {
		return input.type;
	}
	return `${input.type}s`;
}); /* { schemaAttribute: (input) => {
	if (input.type === 'series') {
		return input.type;
	}
	return `${input.type}s`;
}});

/*const mediaSchema = new schema.Entity.Array({
	movies: movieSchema,
	series: seriesSchema
}, (input) => `${input.type}s`) */

/* mediaSchema.define({
 owner: userSchema
 }); */

const Schemas = {
	USER: userSchema,
	USER_ARRAY: [userSchema],
	MOVIE: mediaSchema,
	MOVIE_ARRAY: [mediaSchema],
	SERIES: mediaSchema,
	SERIES_ARRAY: [mediaSchema],
	MEDIA: mediaSchema,
	MEDIA_ARRAY: [mediaSchema]
};
export default Schemas;
