import Flex from "components/_atoms/Flex";
import Input from "components/_atoms/Input";
import { getExchangeData, IExchange } from "lib/apis/calculate";
import { CurrencyList } from "public/Currency";
import React, { useEffect, useState } from "react";

const CurrencyCalculator = () => {
  const [calInfo, setCalInfo] = useState({
    from: 1,
    fromCode: "USD",
    to: 0,
    toCode: "KRW",
  });
  const [symbols, setSymbols] = useState<IExchange[]>([]);
  const getToday = (inputDate: Date) => {
    let date = inputDate;
    const dayOfWeek = date.getDay();
    if (dayOfWeek > 5) {
      // 주말 제외
      const datCnt = dayOfWeek - 5;
      date = new Date(new Date().setDate(date.getDate() - datCnt));
    }
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate() + 1).slice(-2);
    return year + month + day;
  };
  const getCost = (cur_unit: string) => {
    return parseFloat(
      symbols
        .filter((symbol: any) => symbol.cur_unit === cur_unit)[0]
        .deal_bas_r.replace(",", "")
    );
  };
  const getData = async (date: Date) => {
    try {
      const data = await getExchangeData(getToday(date));
      setSymbols(data as IExchange[]);
    } catch (error) {
      getData(new Date(new Date().setDate(date.getDate() - 1)));
    }
  };

  useEffect(() => {
    getData(new Date());
  }, []);
  useEffect(() => {
    if (symbols.length !== 0) {
      setCalInfo((p) => ({
        ...p,
        to: getCost(p.fromCode),
      }));
    }
  }, [symbols]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const { type } = e.target.dataset;
    const code = value.split(":")[0];
    const cost = value.split(":")[1];
    switch (type) {
      case "from":
        setCalInfo((p) => ({
          ...p,
          fromCode: code as string,
          to: parseFloat(cost.replace(",", "")) * p.from,
        }));
        break;
      case "to":
        setCalInfo((p) => ({
          ...p,
          toCode: code as string,
          to: p.to / parseFloat(cost.replace(",", "")),
        }));
        break;
    }
  };
  const handleChangeCostInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    if (value === "") {
      setCalInfo((p) => ({
        ...p,
        from: 0,
        to: 0,
      }));
      return;
    }
    switch (id) {
      case "from":
        setCalInfo((p) => ({
          ...p,
          from: parseInt(value),
          to: getCost(p.fromCode) * parseInt(value),
        }));
        break;
      case "to":
        setCalInfo((p) => ({
          ...p,
          from: (1 / getCost(p.fromCode)) * parseInt(value),
          to: parseInt(value),
        }));
        break;
    }
  };
  return (
    <Flex dir="column" gap="8px" width="90%" centerVH>
      <Flex dir="column">
        <select onChange={handleChangeInput} data-type="from">
          {symbols.map((symbol: any) =>
            symbol.cur_unit === "USD" ? (
              <option
                selected
                value={`${symbol.cur_unit}:${symbol.deal_bas_r}`}
              >
                {CurrencyList[symbol.cur_unit] + " " + symbol.cur_unit}
              </option>
            ) : (
              <option value={`${symbol.cur_unit}:${symbol.deal_bas_r}`}>
                {CurrencyList[symbol.cur_unit] + " " + symbol.cur_unit}
              </option>
            )
          )}
        </select>
        <Input
          value={calInfo.from}
          id="from"
          onChange={handleChangeCostInput}
        />
      </Flex>
      <Flex dir="column">
        <select onChange={handleChangeInput} data-type="to">
          {symbols.map((symbol: any) =>
            symbol.cur_unit === "KRW" ? (
              <option
                selected
                value={`${symbol.cur_unit}:${symbol.deal_bas_r}`}
              >
                {CurrencyList[symbol.cur_unit] + " " + symbol.cur_unit}
              </option>
            ) : (
              <option value={`${symbol.cur_unit}:${symbol.deal_bas_r}`}>
                {CurrencyList[symbol.cur_unit] + " " + symbol.cur_unit}{" "}
              </option>
            )
          )}
        </select>
        <Input value={calInfo.to} id="to" onChange={handleChangeCostInput} />
      </Flex>
    </Flex>
  );
};

export default CurrencyCalculator;
