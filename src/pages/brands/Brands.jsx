import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddBrand,
  DelBrand,
  EditBrand,
  GetBrands,
} from "../../reducers/adminPanel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, TextField } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { singleFile } from "../../utils/files";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const Brands = () => {
  const brands = useSelector((store) => store.adminPanel.Brands);
  const dispatch = useDispatch();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [editName, setEditName] = useState("");
  const [editImg, setEditImg] = useState(null);
  const [idx, setIdx] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);

  const [photoBase, setPhotoBase] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(GetBrands());
  }, [dispatch]);
  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-center w-[90%] mx-auto gap-10">
        {brands?.map((e) => {
          // console.log(e);
          return (
            <div
              key={e.id}
              className="hover:shadow-2xl hover:shadow-purple-300 hover:drop-shadow-2xl "
            >
              <Card className="" sx={{ maxWidth: 400, height: 600 }}>
                <CardActionArea>
                  <CardMedia
                    className="h-[300px] object-cover"
                    component="img"
                    image={"http://localhost:3000/" + e?.img}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {e.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Apple is an American corporation, developer of personal
                      and tablet computers, audio players, smartphones, software
                      and digital content. Headquarters are located in
                      Cupertino, California.
                    </Typography>
                    <Button
                      onClick={() => {
                        dispatch(DelBrand(e.id));
                      }}
                      sx={{ mt: 1 }}
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        setEdit(!false);
                        handleClickOpen();
                        setEditImg("http://localhost:3000/" + e?.img),
                          setEditName(e.name),
                          setIdx(e.id);
                      }}
                      sx={{ ml: 2, mt: 1 }}
                      variant="contained"
                      color="warning"
                      startIcon={<BorderColorIcon />}
                    >
                      Edit
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          );
        })}{" "}
        <Button
          className="self-end lg:justify-self-start justify-self-center"
          onClick={() => {
            setAdd(!false);
            handleClickOpen();
          }}
        >
          <ControlPointIcon
            onClick={() => {
              setAdd(!false);
            }}
            className=""
            fontSize="large"
          />
        </Button>
      </div>
      {/* <button onClick={() => dispatch(AddBrand({ text, img }))}>add</button> */}
      <div className="">
        {edit ? (
          <React.Fragment>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogTitle
                className="w-[500px]"
                sx={{ m: 0, p: 2 }}
                id="customized-dialog-title"
              >
                Edit Brand
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={() => {
                  handleClose(), setEdit(false);
                }}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers className="grid gap-5">
                <TextField
                  value={editName}
                  onChange={(e) => {
                    setEditName(e.target.value);
                  }}
                  label="Name"
                  type=""
                />
                <Button
                  // onChange={(e) => {
                  //   setEditImg(e.target.value);
                  // }}
                  // value={editImg}
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    onChange={(e) => setPhotoBase(e.target.files[0])}
                    type="file"
                  />
                </Button>
                <img src={photoBase} alt="" />
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  // onClick={() => {
                  //   dispatch(
                  //     EditBrand(
                  //       { id: idx, name: editName, img: editImg },
                  //       handleClose(),
                  //       setEdit(false)
                  //     )
                  //   );
                  // }}
                  onClick={async () => {
                    if (!photoBase) {
                      const obj = {
                        id: idx,
                        name: editName,
                        img: editImg,
                      };
                      dispatch(EditBrand({ ...obj }));
                    } else {
                      const formdata = new FormData();
                      formdata.append("file", photoBase);
                      const image = await singleFile(formdata);
                      dispatch(
                        EditBrand({
                          id: idx,
                          name: editName,
                          img: image.img,
                        })
                      );
                    }
                    handleClose(), setEdit(false);
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </React.Fragment>
        ) : add ? (
          <React.Fragment>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <DialogTitle
                className="w-[500px]"
                sx={{ m: 0, p: 2 }}
                id="customized-dialog-title"
              >
                Add Brand
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={() => {
                  handleClose(), setAdd(false);
                }}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers className="grid gap-5">
                <TextField
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  label="Name"
                  type="text"
                />
                <Button
                  // onChange={(e) => {
                  //   setImg(e.target.value);
                  // }}
                  // value={editImg}
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    onChange={(event) => {
                      setPhotoBase(event.target.files[0]);
                    }}
                    type="file"
                  />
                </Button>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  // onClick={() => {
                  //   dispatch(AddBrand(name, img));
                  //   handleClose();
                  //   setAdd(false);
                  // }}
                  onClick={async () => {
                    let formdata = new FormData();
                    formdata.append("file", photoBase);
                    const avatar = await singleFile(formdata);
                    dispatch(
                      AddBrand({
                        name: name,
                        img: avatar.img,
                      })
                    );
                    handleClose();
                    setAdd(false);
                  }}
                >
                  Add
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default Brands;
