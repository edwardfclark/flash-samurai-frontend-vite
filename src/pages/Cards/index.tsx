import { GridColDef, GridRowsProp, DataGrid } from "@mui/x-data-grid";
import { Typography, Button, Box, CircularProgress } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetGroup } from "../../hooks/Group/useGetGroup";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { useGetCards } from "../../hooks/Card/useGetCards";
import { ICard } from "../../types/Cards";
import { EmptyTableOverlay } from "../../components/EmptyTableOverlay";
import { Actions } from "./Actions";

export function Cards() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsPage = searchParams?.get("page");
  const searchParamsLimit = searchParams?.get("limit");
  const [paginationModel, setPaginationModel] = useState({
    page: searchParamsPage ? parseInt(searchParamsPage) : 0,
    pageSize: searchParamsLimit ? parseInt(searchParamsLimit) : 20,
  });
  const params = useParams();
  const groupId = params?.groupId;
  const { data: group } = useGetGroup({ groupId });
  const {
    data: result,
    isLoading,
    isFetching,
  } = useGetCards({
    groupId,
    page: paginationModel.page?.toString(),
    limit: paginationModel.pageSize?.toString(),
  });
  const showLoading = isLoading || isFetching;
  const data = result?.data || [];
  const total = result?.total || 0;

  const rows: GridRowsProp = data.map((card: ICard) => ({
    id: card._id,
    question: card.question,
    answer: card.answer,
    references: card.references?.map((ref) => ref.text).join(", ") ?? "-",
    tags: card.tags?.map((tag) => tag.name).join(", ") ?? "-",
  }));

  const columns: GridColDef[] = [
    {
      field: "question",
      headerName: "Question",
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "answer",
      headerName: "Answer",
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "references",
      headerName: "References",
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
    {
      field: "actions",
      headerName: "",
      maxWidth: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      disableReorder: true,
      renderCell: ({ row }) => <Actions row={row} />,
    },
  ];

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { name: "Card Groups", path: "/" },
          { name: "Cards", path: `/groups/${groupId}/cards` },
        ]}
      />
      <Typography variant="h2">{`${group?.name ?? "Group"} Cards`}</Typography>
      <Typography variant="subtitle1" sx={{ margin: "0 0 1rem" }}>
        Cards are individual flash cards that belong to a group. Cards can have
        multiple tags, but can only belong to one group.
      </Typography>
      {showLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            mt: "5rem",
          }}
        >
          <CircularProgress size={80} />
        </Box>
      )}
      {!showLoading && (
        <Box sx={{ mb: "2rem" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              mb: "0.5rem",
            }}
          >
            <Button
              variant="contained"
              endIcon={<Add />}
              onClick={() => navigate(`/groups/${groupId}/cards/create`)}
            >
              Create
            </Button>
          </Box>
          <DataGrid
            rows={rows}
            columns={columns}
            paginationMode="server"
            rowCount={total}
            loading={isLoading}
            pageSizeOptions={[5, 10, 20, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={(model) => {
              const { page, pageSize } = model;
              setSearchParams({
                page: page?.toString(),
                limit: pageSize?.toString(),
              });
              setPaginationModel(model);
            }}
            disableRowSelectionOnClick
            autoHeight
            slots={{
              noRowsOverlay: () => (
                <EmptyTableOverlay text="No Cards available for display" />
              ),
            }}
          />
        </Box>
      )}
    </>
  );
}
