import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getConnexion } from './ConnexionAPI';

export const getConnexionAsync = createAsyncThunk(
	'connexion/fetchConnexion',
	async () => {
		const response = await getConnexion();
		return response;
	}
);

const initialState = {
	isLoaded: false,
	user: {},
};
export const connexionSlice = createSlice({
	name: 'connexion',
	initialState,
	reducers: {
		reset: (state) => {
			state = initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getConnexionAsync.pending, (state) => {
				state.isLoaded = false;
			})
			.addCase(getConnexionAsync.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLoaded = true;
				localStorage.setItem('token', action.payload.token);
				localStorage.setItem('time', Date.now());
			})
			.addCase(getConnexionAsync.rejected, (state, action) => {
				state.isLoaded = false;
			});
	},
});

export const { reset } = connexionSlice.actions;
export const isLoaded = (state) => state.connexion.isLoaded;
export default connexionSlice.reducer;
