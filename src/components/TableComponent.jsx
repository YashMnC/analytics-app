import { useState } from "react";
import { useGetDataAllQuery, useGetDataSearchQuery } from "../Services/dataApi";
import { formatDate } from "../utils/formatDate";
import Paper from "@material-ui/core/Paper";
import { TableCell } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import millify from "millify";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function TableComponent(props) {
  const [dateCol, setDateCol] = useState(true);
  const [nameCol, setNameCol] = useState(true);
  const [reqCol, setReqCol] = useState(true);
  const [resCol, setResCol] = useState(true);
  const [impressionsCol, setImpressionsCol] = useState(true);
  const [clicksCol, setClicksCol] = useState(true);
  const [revenueCol, setRevenueCol] = useState(true);
  const [fillRateCol, setFillRateCol] = useState(true);
  const [ctrCol, setCTRCol] = useState(true);

  let { startDate, endDate } = props.searchQuery;
  startDate = formatDate(startDate);
  endDate = formatDate(endDate);
  const formatSearchQuery = { startDate, endDate };
  const { data, error, isLoading } = useGetDataSearchQuery(formatSearchQuery);
  const appData = useGetDataAllQuery();
  let appName = [];
  appData?.currentData?.data.forEach((row) => {
    appName.push({ appId: row.app_id, name: row.app_name });
  });

  const getAppName = (id) => {
    let name = "";
    appName.forEach((obj) => {
      console.log(obj.appId == id);
      if (obj.appId == id) name = obj.name;
    });

    return name;
  };

  return (
    <div style={{ marginTop: "1.5rem" }}>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </>
      ) : data ? (
        <>
          <div style={{ marginBottom: "2rem" }}>
            <TableContainer component={Paper}>
              <TableHead>
                <TableRow>
                  <Button
                    variant="text"
                    color={dateCol ? "success" : "error"}
                    onClick={() => setDateCol(!dateCol)}
                  >
                    Date
                  </Button>
                  <Button
                    variant="text"
                    color={nameCol ? "success" : "error"}
                    onClick={() => setNameCol(!nameCol)}
                  >
                    App Name
                  </Button>
                  <Button
                    variant="text"
                    color={reqCol ? "success" : "error"}
                    onClick={() => setReqCol(!reqCol)}
                  >
                    AD Request
                  </Button>
                  <Button
                    variant="text"
                    color={resCol ? "success" : "error"}
                    onClick={() => setResCol(!resCol)}
                  >
                    AD Response
                  </Button>
                  <Button
                    variant="text"
                    color={impressionsCol ? "success" : "error"}
                    onClick={() => setImpressionsCol(!impressionsCol)}
                  >
                    Impressions
                  </Button>
                  <Button
                    variant="text"
                    color={clicksCol ? "success" : "error"}
                    onClick={() => setClicksCol(!clicksCol)}
                  >
                    Clicks
                  </Button>
                  <Button
                    variant="text"
                    color={revenueCol ? "success" : "error"}
                    onClick={() => setRevenueCol(!revenueCol)}
                  >
                    Revenue
                  </Button>
                  <Button
                    variant="text"
                    color={fillRateCol ? "success" : "error"}
                    onClick={() => setFillRateCol(!fillRateCol)}
                  >
                    Fill Rate
                  </Button>
                  <Button
                    variant="text"
                    color={ctrCol ? "success" : "error"}
                    onClick={() => setCTRCol(!ctrCol)}
                  >
                    CTR
                  </Button>
                </TableRow>
              </TableHead>
            </TableContainer>
          </div>
          <TableContainer component={Paper} style={{ marginBottom: "2rem" }}>
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  {dateCol ? <TableCell>Date</TableCell> : <div></div>}
                  {nameCol ? <TableCell>App Name</TableCell> : <div></div>}
                  {reqCol ? <TableCell>AD Request</TableCell> : <div></div>}
                  {resCol ? <TableCell>AD Response</TableCell> : <div></div>}
                  {impressionsCol ? (
                    <TableCell>Impressions</TableCell>
                  ) : (
                    <div></div>
                  )}
                  {clicksCol ? <TableCell>Clicks</TableCell> : <div></div>}
                  {revenueCol ? <TableCell>Revenue</TableCell> : <div></div>}
                  {fillRateCol ? <TableCell>Fill Rate</TableCell> : <div></div>}
                  {ctrCol ? <TableCell>CTR</TableCell> : <div></div>}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((row) => (
                  <TableRow key={row.id}>
                    {dateCol ? (
                      <TableCell>{formatDate(row.date)}</TableCell>
                    ) : (
                      <div></div>
                    )}
                    {nameCol ? (
                      <TableCell>{getAppName(row.app_id)}</TableCell>
                    ) : (
                      <div></div>
                    )}
                    {reqCol ? (
                      <TableCell>{millify(row.requests)}</TableCell>
                    ) : (
                      <div></div>
                    )}
                    {resCol ? (
                      <TableCell>{millify(row.responses)}</TableCell>
                    ) : (
                      <div></div>
                    )}
                    {impressionsCol ? (
                      <TableCell>{millify(row.impressions)}</TableCell>
                    ) : (
                      <div></div>
                    )}
                    {clicksCol ? (
                      <TableCell>{millify(row.clicks)}</TableCell>
                    ) : (
                      <div></div>
                    )}
                    {revenueCol ? (
                      <TableCell>${millify(row.revenue)}</TableCell>
                    ) : (
                      <div></div>
                    )}

                    {fillRateCol ? (
                      <TableCell>
                        {((row.requests / row.responses) * 100).toFixed(4)}%
                      </TableCell>
                    ) : (
                      <div></div>
                    )}
                    {ctrCol ? (
                      <TableCell>
                        {((row.clicks / row.impressions) * 100).toFixed(4)}%
                      </TableCell>
                    ) : (
                      <div></div>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </div>
  );
}
