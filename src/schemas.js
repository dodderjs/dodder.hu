import { schema } from 'normalizr';


const userSchema = new schema.Entity('users', {
	idAttribute: user => user.id
});

const movieSchema = new schema.Entity('movies', {
	idAttribute: media => media.id
});
const seriesSchema = new schema.Entity('series', {
	idAttribute: media => media.id
});
const mediaSchema = new schema.Union({
	movies: movieSchema,
	series: seriesSchema
}, { schemaAttribute: (input) => {
	if (input.type === 'series') {
		return input.type;
	}
	return `${input.type}s`;
}});

/*const mediaSchema = new schema.Entity.Array({
	movies: movieSchema,
	series: seriesSchema
}, (input) => `${input.type}s`)*/

/*mediaSchema.define({
 owner: userSchema
 });*/

const Schemas = {
	USER: userSchema,
	USER_ARRAY: [userSchema],
	MOVIE: movieSchema,
	MOVIE_ARRAY: [movieSchema],
	SERIES: seriesSchema,
	SERIES_ARRAY: [seriesSchema],
	MEDIA: mediaSchema,
	MEDIA_ARRAY: [mediaSchema]
};
export default Schemas;
