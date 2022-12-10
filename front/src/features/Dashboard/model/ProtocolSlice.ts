import { CRYPTO_API_HOST, CRYPTO_API_KEY } from "@config/Constants";
import { IEntityBaseState } from "@config/redux/common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@config/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ProtocolRequest from "./protocol.dto.request";
import ProtocolResponse from "./protocol.dto.response";

export const listLatestProtocols = createAsyncThunk(
  "protocol/listLatestProtocols",
  async (request: ProtocolRequest): Promise<ProtocolResponse> => {
    const params = new URLSearchParams(request).toString();
    const resp: ProtocolResponse = await axios.get(
      `${CRYPTO_API_HOST}?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return resp;
  }
);

export interface ProtocolBaseState {
  list: IEntityBaseState<ProtocolResponse>;
}

const protocolInitialState: ProtocolBaseState = {
  list: {
    status: "pending",
    payload: undefined,
    error: undefined,
  },
};

const protocolSlice = createSlice({
  name: "protocol",
  initialState: protocolInitialState,
  reducers: {
    initializeState: (state) => {
      Object.keys(state).forEach((key) => {
        (state as any)[key] = (protocolInitialState as any)[key];
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listLatestProtocols.pending, (state) => {
      state.list.status = "loading";
      state.list.payload = undefined;
    });
    builder.addCase(listLatestProtocols.fulfilled, (state, action) => {
      state.list.payload = action.payload as ProtocolResponse;
      state.list.status = "complete";
    });
    builder.addCase(listLatestProtocols.rejected, (state, action) => {
      state.list.status = "failed";
      state.list.error = action.error;
    });
  },
});

export const protocolSelectors = {
  protocolList: (store: RootState) => store.protocol.list,
};
export const { initializeState } = protocolSlice.actions;
export default protocolSlice.reducer;
