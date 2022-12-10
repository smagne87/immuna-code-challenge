import clsx from "clsx";
import { FaSort } from "react-icons/fa";
import Loader from "@components/Loader";
import Pagination from "@components/Pagination";
import { StateUtils } from "@config/redux/common";
import { useAppDispatch, useAppSelector } from "@config/redux/hooks";
import React, { useEffect, useState } from "react";
import ProtocolRequest from "@features/Dashboard/model/protocol.dto.request";
import {
  listLatestProtocols,
  protocolSelectors,
} from "@features/Dashboard/model/ProtocolSlice";
import "./protocol-list.css";
import RiskStatus from "../RiskStatus";

const PAGE_SIZES = [5, 10, 20, 50, 100];

const ProtocolList = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const protocolSelector = useAppSelector(protocolSelectors.protocolList);
  const [filters, setFilters] = useState<ProtocolRequest>({});

  const getProtocolList = () => {
    dispatch(listLatestProtocols(filters));
  };

  const handlePageChange = (nextPage: number) => setCurrentPage(nextPage);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPageSize(Number(e.currentTarget.value));
  };

  useEffect(() => {
    getProtocolList();
  }, [filters]);

  return (
    <div className="list-container w-full mt-4">
      <div className="rounded-lg">
        <table className="w-full rounded-lg">
          <thead className="text-left bg-blue-300 rounded-lg">
            <tr>
              <th><div className="flex items-center gap-1">Protocol <FaSort /></div></th>
              <th><div className="flex items-center gap-1">Pool <FaSort /></div></th>
              <th><div className="flex items-center gap-1">Balance <FaSort /></div></th>
              <th><div className="flex items-center gap-1">Risk Status <FaSort /></div></th>
            </tr>
          </thead>
          <tbody>
            {StateUtils.isLoading(protocolSelector) && (
              <tr>
                <td colSpan={4}>
                  <Loader />
                </td>
              </tr>
            )}
            {StateUtils.isComplete(protocolSelector) &&
              protocolSelector.payload?.data &&
              protocolSelector.payload.data
                .slice(
                  (currentPage - 1) * currentPageSize,
                  currentPage * currentPageSize
                )
                .map((item, index) => (
                  <tr
                    key={item.id}
                    className={clsx({
                      "bg-white": index % 2 === 0,
                      "bg-blue-100": index % 2 !== 0,
                    })}
                  >
                    <td>{item.name}</td>
                    <td>
                      ({item.symbol}) - {item.name}
                    </td>
                    <td>
                      {item.symbol} {Number(item.total_supply).toLocaleString()}{" "}
                      / USD {Number(item.quote["USD"].price).toLocaleString()}
                    </td>
                    <td><RiskStatus /></td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between w-full py-6">
        <div className="flex gap-1 items-center">
          <p>Show</p>
          <select onChange={handlePageSizeChange} value={currentPageSize}>
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <p>results of {protocolSelector.payload?.data.length} entries</p>
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={protocolSelector.payload?.data.length || 0}
          pageSize={currentPageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProtocolList;
