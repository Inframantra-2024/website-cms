import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProjectServices from '../../services/projectApi';

const initialState = {
  data: null,
  status: 'idle',
  error: null,
};

// Thunk to fetch project data
export const fetchProjectData = createAsyncThunk('project/fetchData', async () => {
  try {
    const response = await ProjectServices.getProjects();
    return response;
  } catch (error) {
    throw error;
  }
});

// Thunk to create a new project
export const createProject = createAsyncThunk('project/createProject', async (projectData) => {
  try {
    const response = await ProjectServices.createProject(projectData);
    return response;
  } catch (error) {
    throw error;
  }
});

// Thunk to update an existing project
export const updateProject = createAsyncThunk('project/updateProject', async ({ id, projectData }) => {
  try {
    const response = await ProjectServices.updateProject(id, projectData);
    return response;
  } catch (error) {
    throw error;
  }
});

// Thunk to delete a project
export const deleteProject = createAsyncThunk('project/deleteProject', async (projectId) => {
  try {
    const response = await ProjectServices.deleteProject(projectId);
    return response;
  } catch (error) {
    throw error;
  }
});

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch data
      .addCase(fetchProjectData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProjectData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle create project
      .addCase(createProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = [...state.data, action.payload];
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle update project
      .addCase(updateProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.map((project) =>
          project._id === action.payload._id ? action.payload : project
        );
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle delete project
      .addCase(deleteProject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Refetch the project data after deletion
        state.data = action.payload;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
