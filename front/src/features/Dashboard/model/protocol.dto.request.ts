type ProtocolRequest = {
  start?: string;
  limit?: string;
  sort?: string;
  sort_dir?: "asc" | "desc";
};

export default ProtocolRequest;
