import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useDataStore } from "../store/DataStore";

function formatRiskFactors(data, factor) {
  const formatedData = data.map((marker) => {
    return {
      ...marker,
      "Risk Factors": Object.keys(marker["Risk Factors"]),
      "Risk Rating":
        factor === "All"
          ? marker["Risk Rating"]
          : marker["Risk Factors"][factor],
    };
  });
  return formatedData;
}
export default function DataTable() {
  const [filteredData, factor] = useDataStore((state) => [
    state.filteredData,
    state.factor,
  ]);
  const columns = [
    { field: "Asset Name", headerName: "Asset Name", width: 240 },
    { field: "Lat", headerName: "Latitude", width: 70, type: "number" },
    { field: "Long", headerName: "Longitude", width: 85, type: "number" },
    {
      field: "Business Category",
      headerName: "Business Category",
      width: 150,
    },
    {
      field: "Region",
      headerName: "Region",
      width: 125,
    },
    {
      field: "Risk Rating",
      headerName: "Risk Rating -" + factor,
      width: 200,
      type: "number",
    },
    {
      field: "Risk Factors",
      headerName: "Risk Factors",
      width: 920,
      sortable: false,
    },
    {
      field: "Year",
      headerName: "Decade",
      width: 80,
      type: "number",
    },
  ];
  return (
    <Box sx={{ borderColor: "blue.900", height: "100%", width: "100%" }}>
      <DataGrid
        sx={{
          width: "100vw",
          height: "87vh",
        }}
        rows={formatRiskFactors(filteredData, factor)}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 13,
            },
          },
        }}
        pageSizeOptions={[13]}
      />
    </Box>
  );
}
