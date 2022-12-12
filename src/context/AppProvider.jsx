import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { getListCategorys } from "../apis/categoryApiService";
import { getListBrands, getListBuilding, getListStoreCategory } from "../apis/storeApiService";
import { notify } from "../components/Toast/ToastCustom";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [openModal, setOpenModal] = useState(false);
    const [isLoadingMain, setIsLoadingMain] = useState(false);
    const [openModalNewCateStore, setOpenModalNewCateStore] = useState(false);
    const [productModal, setProductModal] = useState({});
    const [storeModal, setStoreModal] = useState({});
    const [orderModal, setorderModal] = useState({});
    const [categoryModal, setCategoryModal] = useState({});

    const [areaModal, setAreaModal] = useState({});
    const [openAreaModal, setOpenAreaModal] = useState(false);
    const [openNewAreaModal, setOpenNewAreaModal] = useState(false);

    const [clusterModal, setClusterModal] = useState({});
    const [openNewClusterModal, setOpenNewClusterModal] = useState(false);
    const [openClusterModal, setOpenClusterModal] = useState(false);
    const [openDeleteClusterModal, setOpenDeleteClusterModal] = useState(false);

    const [buildingModal, setBuildingModal] = useState({});
    const [openNewBuildingModal, setOpenNewBuildingModal] = useState(false);
    const [openBuildingModal, setOpenBuildingModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const [hubModal, setHubModal] = useState({});
    const [openNewHubModal, setOpenNewHubModal] = useState(false);
    const [openHubModal, setOpenHubModal] = useState(false);
    // const [openDeleteHubModal, setOpenDeleteHubModal] = useState(false);

    const [deleteModal, setDeleteModal] = useState({});
    const [storeCategoryModal, setStoreCategoryModal] = useState({});
    const [shipperModal, setShipperModal] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [brandList, setBrandList] = useState([]);
    const [menu, setMenu] = useState(1);
    const [mode, setMode] = useState(1);
    const [buildingList, setBuildingList] = useState([]);
    // const [reloadCategories, setReloadCategories] = useState(false);
    const [storeCategoryList, setStoreCategoryList] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({});
    const handleGetListCategory = () => {
        getListCategorys(1, 100).then((res) => {
            const categorys = res.data;
            setCategoryList(categorys);
            // setReloadCategories(false);
        });
    };

    useEffect(() => {
        getListBuilding(1, 100)
            .then((res) => {
                const buildings = res.data;
                setBuildingList(
                    buildings.sort(function (a, b) {
                        console.log();
                        return parseInt(a.id.split("b")[1]) - parseInt(b.id.split("b")[1]);
                    })
                );
            })
            .catch((error) => {
                notify("Đã xảy ra lỗi gì đó!!", "Error");
            });
        handleGetListCategory();
        getListBrands(1, 100)
            .then((res) => {
                const brands = res.data;
                setBrandList(brands);
            })
            .catch((error) => console.log(error));
        getListStoreCategory(1, 100)
            .then((res) => {
                const storeCategory = res.data;
                setStoreCategoryList(storeCategory);
            })
            .catch((error) => console.log(error));
        return () => {};
    }, []);

    return (
        <AppContext.Provider
            value={{
                openModal,
                setOpenModal,
                user,
                setUser,
                isLogin,
                setIsLogin,
                productModal,
                setProductModal,
                categoryList,
                setCategoryList,
                storeModal,
                setStoreModal,
                brandList,
                setBrandList,
                storeCategoryList,
                setStoreCategoryList,
                categoryModal,
                setCategoryModal,
                menu,
                setMenu,
                buildingList,
                setBuildingList,
                storeCategoryModal,
                setStoreCategoryModal,
                openModalNewCateStore,
                setOpenModalNewCateStore,
                deleteModal,
                setDeleteModal,
                openDeleteModal,
                setOpenDeleteModal,
                mode,
                setMode,
                shipperModal,
                setShipperModal,
                orderModal,
                setorderModal,
                areaModal,
                setAreaModal,
                openAreaModal,
                setOpenAreaModal,
                openNewAreaModal,
                setOpenNewAreaModal,
                openNewBuildingModal,
                setOpenNewBuildingModal,
                buildingModal,
                setBuildingModal,
                openBuildingModal,
                setOpenBuildingModal,
                openDeleteClusterModal,
                setOpenDeleteClusterModal,
                openClusterModal,
                setOpenClusterModal,
                clusterModal,
                setClusterModal,
                openNewClusterModal,
                setOpenNewClusterModal,
                hubModal,
                setHubModal,
                openNewHubModal,
                setOpenNewHubModal,
                openHubModal,
                setOpenHubModal,
                isLoadingMain,
                setIsLoadingMain,
                openCategoryModal,
                setOpenCategoryModal,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
