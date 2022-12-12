/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react library for routing
import { Link, NavLink as NavLinkRRD, useLocation } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
// react library that creates nice scrollbar on windows devices
import PerfectScrollbar from "react-perfect-scrollbar";
// reactstrap components
import { Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";

function Sidebar({ toggleSidenav, sidenavOpen, routes, logo, rtlActive }) {
    const [state, setState] = React.useState({});
    const location = useLocation();
    React.useEffect(() => {
        document.body.classList.add("g-sidenav-hidden");
        // document.body.classList.add("g-sidenav-pinned");
        setState(getCollapseStates(routes));
        // eslint-disable-next-line
    }, []);
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    // makes the sidenav normal on hover (actually when mouse enters on it)
    const onMouseEnterSidenav = () => {
        if (!document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.add("g-sidenav-show");
        }
    };
    // makes the sidenav mini on hover (actually when mouse leaves from it)
    const onMouseLeaveSidenav = () => {
        if (!document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-show");
        }
    };
    // this creates the intial state of this component based on the collapse routes
    // that it gets through routes
    const getCollapseStates = (routes) => {
        let initialState = {};
        routes.map((prop, key) => {
            if (prop.collapse) {
                initialState = {
                    [prop.state]: getCollapseInitialState(prop.views),
                    ...getCollapseStates(prop.views),
                    ...initialState,
                };
            }
            return null;
        });
        return initialState;
    };
    // this verifies if any of the collapses should be default opened on a rerender of this component
    // for example, on the refresh of the page,
    // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
    const getCollapseInitialState = (routes) => {
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
                return true;
            } else if (location.pathname.indexOf(routes[i].path) !== -1) {
                return true;
            }
        }
        return false;
    };
    // this is used on mobile devices, when a user navigates
    // the sidebar will autoclose
    const closeSidenav = () => {
        if (window.innerWidth < 1200) {
            toggleSidenav();
        }
    };
    // this function creates the links and collapses that appear in the sidebar (left menu)
    const createLinks = (routes) => {
        return routes.map((prop, key) => {
            if (prop.redirect) {
                return null;
            }
            if (prop.collapse) {
                var st = {};
                st[prop["state"]] = !state[prop.state];
                return (
                    <NavItem key={key}>
                        <NavLink
                            href="#pablo"
                            data-toggle="collapse"
                            aria-expanded={state[prop.state]}
                            className={classnames({
                                active: getCollapseInitialState(prop.views),
                            })}
                            onClick={(e) => {
                                e.preventDefault();
                                setState(st);
                            }}
                        >
                            {prop.icon ? (
                                <>
                                    <i className={prop.icon} />
                                    <span className="in-active">{prop.name}</span>
                                </>
                            ) : prop.miniName ? (
                                <>
                                    <span className="sidenav-mini-icon"> {prop.miniName} </span>
                                    <span className="sidenav-normal"> {prop.name} </span>
                                </>
                            ) : null}
                        </NavLink>
                        {/* <Collapse isOpen={state[prop.state]}>
                            <Nav className="nav-sm flex-column">{createLinks(prop.views)}</Nav>
                        </Collapse> */}
                    </NavItem>
                );
            }
            return (
                <>
                    {/* {prop.type === 1 && <span className="">Giao hàng</span>} */}
                    {prop.type === 1 && (
                        <span className="side-bar-type" style={{ padding: "0.675rem 1.5rem  0.675rem 1.5rem", color: "rgb(33, 43, 54)", visibility: "hidden", fontSize: "1px", fontWeight: 700 }}>
                            Tổng quan
                        </span>
                    )}
                    {prop.type === 2 && (
                        <span className="side-bar-type" style={{ color: "rgb(33, 43, 54)", visibility: "hidden", fontSize: "1px", fontWeight: 700 }}>
                            Giao hàng
                        </span>
                    )}
                    {prop.type === 3 && (
                        <span className="side-bar-type" style={{ color: "rgb(33, 43, 54)", visibility: "hidden", fontSize: "1px", fontWeight: 700 }}>
                            Hệ thống
                        </span>
                    )}
                    <NavItem className={activeRoute(prop.layout + prop.path)} key={key}>
                        <NavLink to={prop.layout + prop.path} activeClassName="sidebar-name" style={{ padding: prop.icon === "fa-solid fa-store" && "1.3rem" }} onClick={closeSidenav} tag={NavLinkRRD}>
                            {prop.icon !== undefined ? (
                                <>
                                    <i className={prop.icon} style={{ fontSize: 22 }} />
                                    <span className="">{prop.name}</span>
                                </>
                            ) : prop.miniName !== undefined ? (
                                <>
                                    <span className="sidenav-mini-icon"> {prop.miniName} </span>
                                    <span className="sidenav-normal"> {prop.name} </span>
                                </>
                            ) : (
                                prop.name
                            )}
                        </NavLink>
                    </NavItem>
                </>
            );
        });
    };

    let navbarBrandProps;
    if (logo && logo.innerLink) {
        navbarBrandProps = {
            to: logo.innerLink,
            tag: Link,
        };
    } else if (logo && logo.outterLink) {
        navbarBrandProps = {
            href: logo.outterLink,
            target: "_blank",
        };
    }
    const scrollBarInner = (
        <div className="scrollbar-inner">
            <div className="sidenav-header d-flex align-items-center" style={{ paddingTop: 25 }}>
                {logo ? (
                    <>
                        <NavbarBrand {...navbarBrandProps} style={{ flex: 1 }}>
                            <img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </NavbarBrand>
                        {/* <div>
                            <span className="navbar-brand-name ">3SACHFOOD</span>
                        </div> */}
                    </>
                ) : null}

                <div className="ml-auto">
                    <div
                        className={classnames("sidenav-toggler d-none d-xl-block", {
                            active: sidenavOpen,
                        })}
                        onClick={toggleSidenav}
                    >
                        <div className="sidenav-toggler-inner">
                            <i className="sidenav-toggler-line" />
                            <i className="sidenav-toggler-line" />
                            <i className="sidenav-toggler-line" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar-inner">
                <Collapse navbar isOpen={false}>
                    <Nav navbar>{createLinks(routes)}</Nav>
                    {/* <hr className="my-3" /> */}
                    {/* <h6 className="navbar-heading p-0 text-muted">
                        <span className="docs-normal">Documentation</span>
                        <span className="docs-mini">D</span>
                    </h6> */}
                    {/* <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/overview?ref=adpr-sidebar"
                target="_blank"
              >
                <i className="ni ni-spaceship" />
                <span className="nav-link-text">Getting started</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/colors?ref=adpr-sidebar"
                target="_blank"
              >
                <i className="ni ni-palette" />
                <span className="nav-link-text">Foundation</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/alert?ref=adpr-sidebar"
                target="_blank"
              >
                <i className="ni ni-ui-04" />
                <span className="nav-link-text">Components</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/charts?ref=adpr-sidebar"
                target="_blank"
              >
                <i className="ni ni-chart-pie-35" />
                <span className="nav-link-text">Plugins</span>
              </NavLink>
            </NavItem>
          </Nav> */}
                </Collapse>
            </div>
        </div>
    );
    return (
        <Navbar className={"sidenav navbar-vertical navbar-expand-xs navbar-light bg-white " + (rtlActive ? "" : "fixed-left")} onMouseEnter={onMouseEnterSidenav} onMouseLeave={onMouseLeaveSidenav}>
            {navigator.platform.indexOf("Win") > -1 ? <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar> : scrollBarInner}
        </Navbar>
    );
}

Sidebar.defaultProps = {
    routes: [{}],
    toggleSidenav: () => {},
    sidenavOpen: false,
    rtlActive: false,
};

Sidebar.propTypes = {
    // function used to make sidenav mini or normal
    toggleSidenav: PropTypes.func,
    // prop to know if the sidenav is mini or normal
    sidenavOpen: PropTypes.bool,
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
    // logo
    logo: PropTypes.shape({
        // innerLink is for links that will direct the user within the app
        // it will be rendered as <Link to="...">...</Link> tag
        innerLink: PropTypes.string,
        // outterLink is for links that will direct the user outside the app
        // it will be rendered as simple <a href="...">...</a> tag
        outterLink: PropTypes.string,
        // the image src of the logo
        imgSrc: PropTypes.string.isRequired,
        // the alt for the img
        imgAlt: PropTypes.string.isRequired,
    }),
    // rtl active, this will make the sidebar to stay on the right side
    rtlActive: PropTypes.bool,
};

export default Sidebar;
