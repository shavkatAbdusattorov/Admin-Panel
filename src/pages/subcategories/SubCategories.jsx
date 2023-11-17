import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DelSubCat, EditSubCat, GetSubCat } from "../../reducers/adminPanel";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
  FileAddTwoTone,
} from "@ant-design/icons";
import { Avatar, Card, Input } from "antd";
import { Button, Modal } from "antd";
import { FileDownloadDoneOutlined } from "@mui/icons-material";
import ButtonGroup from "antd/es/button/button-group";
import { singleFile } from "../../utils/files";
const { Meta } = Card;

const SubCategories = () => {
  const SubCat = useSelector((store) => store.adminPanel.SubCat);
  console.log(SubCat);
  const dispatch = useDispatch();
  const [editName, setEditName] = useState("");
  const [editImg, setEditImg] = useState(null);
  const [idx, setIdx] = useState(null);
  const [photoBase, setPhotoBase] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(GetSubCat());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-4   ">
      {SubCat.map((e) => {
        return (
          <div key={e.id} className="w-[300px]">
            <Card
              style={{
                width: 300,
              }}
              cover={
                <img
                  alt="example"
                  className="w-[100px] h-[200px] object-cover"
                  src={"http://localhost:3000/" + e?.img}
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <DeleteOutlined
                  onClick={() => {
                    dispatch(DelSubCat(e.id));
                  }}
                  key="delete"
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    showModal(), setIdx(e.id);
                    setEditName(e.name);
                    setEditImg("http://localhost:3000/" + e?.img);
                  }}
                />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title={e.name}
                description="This is the description"
              />
            </Card>
          </div>
        );
      })}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={async () => {
          if (!photoBase) {
            const obj = {
              id: idx,
              name: editName,
              img: editImg,
            };
            dispatch(EditSubCat({ ...obj }));
          } else {
            const formdata = new FormData();
            formdata.append("file", photoBase);
            const image = await singleFile(formdata);
            dispatch(EditSubCat({ id: idx, name: editName, img: image.img }));
          }
          handleOk();
        }}
        onCancel={handleCancel}
      >
        <Input
          type="text"
          value={editName}
          onChange={(e) => {
            setEditName(e.target.value);
          }}
        />

        <Input
          type="file"
          onChange={(e) => {
            setPhotoBase(e.target.files[0]);
          }}
        />
        <img src={photoBase} alt="" />
        {/* <Button
          type="primary"
          onClick={async () => {
            if (!photoBase) {
              const obj = {
                id: idx,
                name: editName,
                img: editImg,
              };
              dispatch(EditSubCat({ ...obj }));
            } else {
              const formdata = new FormData();
              formdata.append("file", photoBase);
              const image = await singleFile(formdata);
              dispatch(EditSubCat({ id: idx, name: editName, img: image.img }));
            }
            handleOk();
          }}
        >
          Open Modal
        </Button> */}
      </Modal>
      <div className="self-end">
        <Button type="default">
          <FileAddTwoTone />
        </Button>
      </div>
    </div>
  );
};

export default SubCategories;
