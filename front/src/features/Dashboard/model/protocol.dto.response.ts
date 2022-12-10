type Platform = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
};

type Quote = {
    price: number;
    volume_24h: number;
};

type ProtocolItem = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  total_supply: number;
  platform: Platform;
  quote: Record<string, Quote>;
};

type ProtocolStatus = {
  timestamp: string;
  error_code: number;
  error_message: string;
  elapsed: number;
  credit_count: number;
};

type ProtocolResponse = {
  data: ProtocolItem[];
  status: ProtocolStatus;
};

export default ProtocolResponse;
