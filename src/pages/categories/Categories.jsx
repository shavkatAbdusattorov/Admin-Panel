import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../../App.css";
import {
  AddCategories,
  DelCategories,
  EditBrand,
  EditCategories,
  GetCategories,
} from "../../reducers/adminPanel";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Typography } from "antd";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Mymodal from "../../components/Mymodal";
import { singleFile } from "../../utils/files";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
// import Button from "antd";
// import Modal from "antd";
const Categories = () => {
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [idx, setIdx] = useState(null);
  const [img, setImg] = useState(null);
  const [editName, setEditName] = useState("");
  const [editImg, setEditImg] = useState(null);
  const [add, setAdd] = useState(false);
  const [photoBase, setPhotoBase] = useState(null);

  const categories = useSelector((store) => store.adminPanel.Categories);
  console.log(categories);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-3 items-center gap-5 w-[90%] mx-auto">
      {categories?.map((e) => {
        return (
          <div key={e.id} className="text-center w-[70%] border">
            <img
              className="w-[200px] my-4 rounded-full object-cover h-[200px] inline"
              src={"http://localhost:3000/" + e?.img}
              alt=""
            />
            <div className="mt-5">
              <span className="text-xs font-bold mr-5">Name:</span>
              <span className="text-center">{e.name}</span>
            </div>
            <div>
              <Button
                color="error"
                onClick={() => {
                  dispatch(DelCategories(e.id));
                }}
              >
                <RemoveCircleOutlineIcon color="error" fontSize="large" />
              </Button>
              <Button
                color="warning"
                onClick={() => {
                  handleOpen();
                  setEditName(e.name);
                  setEditImg("http://localhost:3000/" + e?.img);
                  setIdx(e.id);
                }}
              >
                <BorderColorIcon fontSize="large" />
              </Button>
            </div>
          </div>
        );
      })}
      <Button className="self-end lg:justify-self-start justify-self-center">
        <ControlPointIcon
          onClick={() => setAdd(!false)}
          className=""
          fontSize="large"
          BorderColorIcon
        />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="grid p-10 gap-10" sx={style}>
          <TextField
            label="Name"
            value={editName}
            onChange={(e) => {
              setEditName(e.target.value);
            }}
          />{" "}
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              onChange={(event) => {
                setPhotoBase(event.target.files[0]);
              }}
              type="file"
            />{" "}
            <img src={photoBase} alt="" />
          </Button>
          <Button
            onClick={async () => {
              if (!photoBase) {
                const obj = {
                  id: idx,
                  name: editName,
                  img: editImg,
                };
                dispatch(
                  EditCategories({
                    ...obj,
                  })
                );
              } else {
                const formdata = new FormData();
                formdata.append("file", photoBase);
                const image = await singleFile(formdata);
                dispatch(
                  EditCategories({
                    id: idx,
                    name: editName,
                    img: image.img,
                  })
                );
              }
              handleClose();
            }}
          >
            Edit
          </Button>
        </Box>
      </Modal>
      {add ? (
        <div className="modal">
          <div className="modal-content grid p-10 gap-3">
            <TextField
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button
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

            <button
              onClick={async () => {
                let formdata = new FormData();
                formdata.append("file", photoBase);
                const avatar = await singleFile(formdata);
                dispatch(
                  AddCategories({
                    name: name,
                    img: avatar.img,
                  })
                );
                setName("");
                setAdd(false);
              }}
            >
              Add
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Categories;
