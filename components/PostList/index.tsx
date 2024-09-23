import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button, Spinner } from "react-bootstrap";
import EditIcon from "./Icons/EditIcon";
import DeleteIcon from "./Icons/DeleteIcon";
import { getPostsAPI, deletePostAPI } from "../../services/service";
import { PostPayload, Notification } from "../../interface/index";
import Logo from "../../assets/knitto.png";
import Image from "next/image";

type IProps = {
  setNotification: (msg: Notification) => void;
  setIsOpen: (isOpen: boolean) => void;
  setEditObj: (post: PostPayload) => void;
  setPostList: (arr: PostPayload[]) => void;
  postList: PostPayload[];
};

const PostList: React.FC<IProps> = (props) => {
  const { setIsOpen, setEditObj, setNotification, setPostList, postList } =
    props;
  const [loader, setLoader] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const postsPerPage = 10;

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const openModal = () => {
    setIsOpen(true);
  };

  const editPost = (id: number) => {
    openModal();
    const filter = postList.find((item) => item.id === id);
    if (filter) setEditObj(filter);
  };

  const deletePost = async (id: number) => {
    setLoader(true);
    setEditId(id);
    try {
      const response = await deletePostAPI(id);
      if (response.status === 200) {
        const filter = postList.filter((item) => item.id !== id);
        setPostList(filter);
        setNotification({
          msg: "Todo Berhasil Dihapus",
          color: "success",
        });
      }
    } catch (error) {
      setNotification({ msg: "Mungkin ada yang salah", color: "danger" });
    } finally {
      setEditId(null);
      setLoader(false);
    }
  };

  const getData = async (page: number) => {
    try {
      const start = (page - 1) * postsPerPage;
      const response = await getPostsAPI(start, postsPerPage);
      setPostList(response.data);
      setTotalPosts(response.total);
    } catch (error) {
      setNotification({ msg: "Mungkin ada yang salah", color: "danger" });
    }
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-center align-items-center">
        <Image
          src={Logo}
          alt="Logo"
          style={{ width: "70px", height: "70px" }}
        />
        <h3 className="text-center ms-3">Test Frontend Knitto Todo List</h3>
      </div>
      <div className="d-flex justify-content-end">
        <Button className="add-btn" onClick={openModal}>
          Tambah Todo Baru
        </Button>
      </div>
      <div className="main mt-3 table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Todo</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {postList.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  <span className="pointer" onClick={() => editPost(item.id)}>
                    <EditIcon />
                  </span>
                  <span
                    className="pointer ms-3"
                    onClick={() => deletePost(item.id)}
                  >
                    {editId === item.id && loader ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <DeleteIcon />
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center align-items-center">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            style={{ backgroundColor: "#2F3574", color: "white" }}
          >
            <FaArrowLeft />
          </Button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            style={{ backgroundColor: "#2F3574", color: "white" }}
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostList;
