import axios from "axios";
export interface IExchange {
  cur_unit: string;
  deal_bas_r: string;
}
export const getExchangeData = async (stringDate: string) => {
  try {
    const { data } = await axios.get(
      `/koreaxim/site/program/financial/exchangeJSON`,
      {
        params: {
          authkey: process.env.NEXT_PUBLIC_KX_KEY,
          searchdate: stringDate,
          data: "AP01",
        },
      }
    );
    if (data === "") {
      throw new Error();
    }
    return data as IExchange[];
  } catch (error) {
    throw error;
    console.error(error);
  }
};
