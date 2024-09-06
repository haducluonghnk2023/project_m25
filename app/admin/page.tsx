"use client";
import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaAccusoft, FaCartPlus, FaUsers } from "react-icons/fa6";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { SiProducthunt } from "react-icons/si";
import { BiLogOut } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { LiaListAltSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import "../../styles/(admin)/admin.css";

import Dashboard from "../../components/DashBoard";
import AllUser from "../../components/AllUser";
import AllProduct from "../../components/AllProduct";
import AllCategory from "../../components/AllCategory";
import CartManagement from "../../components/CartManagement";
import AddUser from "@/components/AddUser";
import AddProduct from "@/components/AddProduct";
import AddCategory from "@/components/AddCategory";

const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        return <Dashboard />;
      case "all-user":
        return <AllUser />;
      case "add-user":
        return <AddUser />;
      case "all-product":
        return <AllProduct />;
      case "add-product":
        return <AddProduct />;
      case "all-category":
        return <AllCategory />;
      case "add-category":
        return <AddCategory />;
      case "cart":
        return <CartManagement />;
      default:
        return <div></div>;
    }
  };

  const handleMenuClick = (key: string) => {
    if (key === "logout") {
      router.push("/sign-in"); // Điều hướng về trang chính khi đăng xuất
    } else {
      setSelectedKey(key);
    }
  };

  return (
    <Layout className="">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="flex justify-center my-[30px]">
          <div className="demo-logo-vertical rounded-md flex justify-center items-center bg-white h-[50px] w-[80%]">
            <div className="flex justify-center items-center ">
              <FaAccusoft size={30} />
              <p className="">
                <span className="font-bold text-red-600">ECOMMERCE</span>
                <span className="font-bold text-sky-400">-ACE</span>
              </p>
            </div>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: "dashboard",
              icon: <LuLayoutDashboard />,
              label: "Dashboard",
            },
            {
              key: "customer",
              icon: <FaUsers />,
              label: "Quản lí tài khoản",
              children: [
                {
                  key: "all-user",
                  label: "Tất cả tài khoản",
                  icon: <LiaListAltSolid />,
                },
                {
                  key: "add-user",
                  label: "Thêm tài khoản",
                  icon: <IoAdd />,
                },
              ],
            },
            {
              key: "product",
              icon: <SiProducthunt />,
              label: "Quản lí sản phẩm",
              children: [
                {
                  key: "add-product",
                  label: "Thêm sản phẩm",
                  icon: <IoAdd />,
                },
                {
                  key: "all-product",
                  label: "Tất cả sản phẩm",
                  icon: <LiaListAltSolid />,
                },
              ],
            },
            {
              key: "category",
              icon: <SiProducthunt />,
              label: "Quản lí danh mục",
              children: [
                {
                  key: "add-category",
                  label: "Thêm mới danh mục",
                  icon: <IoAdd />,
                },
                {
                  key: "all-category",
                  label: "Tất cả danh mục",
                  icon: <LiaListAltSolid />,
                },
              ],
            },
            {
              key: "cart",
              icon: <FaCartPlus />,
              label: "Quản lí giỏ hàng",
            },
            {
              key: "logout",
              icon: <BiLogOut />,
              label: "Đăng xuất",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}
