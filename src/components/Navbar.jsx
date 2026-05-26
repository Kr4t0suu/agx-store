import { useEffect, useState } from "react";
import {
  Search,
  Menu,
  X,
} from "lucide-react";

import { motion } from "framer-motion";

function Navbar() {
  const [isScrolled, setIsScrolled] =
    useState(false);

  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(
        window.scrollY > 20
      );
    }

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.5,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 999,
          padding: isScrolled
            ? "14px 0"
            : "22px 0",
          transition: "0.3s",
          background: isScrolled
            ? "rgba(5,5,5,0.75)"
            : "transparent",
          backdropFilter: isScrolled
            ? "blur(12px)"
            : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(255,255,255,0.05)"
            : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1450px",
            margin: "0 auto",
            padding: "0 25px",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
          }}
        >
          {/* LOGO */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: "4px",
            }}
          >
            <h1
              style={{
                color: "#fff",
                fontSize: "38px",
                fontWeight: "900",
                letterSpacing: "-1px",
                margin: 0,
              }}
            >
              AGX
            </h1>

            <span
              style={{
                color: "#d4af37",
                fontStyle: "italic",
                fontWeight: "300",
                fontSize: "34px",
              }}
            >
              IMPORTS
            </span>
          </div>

          {/* MENU */}
          <div
            style={{
              display:
                window.innerWidth <
                768
                  ? "none"
                  : "flex",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <a
              href="#"
              style={{
                color: "#fff",
                textDecoration:
                  "none",
                fontWeight: "700",
                fontSize: "14px",
                letterSpacing: "2px",
              }}
            >
              INÍCIO
            </a>

            <a
              href="#products"
              style={{
                color: "#888",
                textDecoration:
                  "none",
                fontWeight: "700",
                fontSize: "14px",
                letterSpacing: "2px",
              }}
            >
              PRODUTOS
            </a>

            <a
              href="#about"
              style={{
                color: "#888",
                textDecoration:
                  "none",
                fontWeight: "700",
                fontSize: "14px",
                letterSpacing: "2px",
              }}
            >
              SOBRE
            </a>
          </div>

          {/* SEARCH + MENU */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            {/* SEARCH */}
            <div
              style={{
                display:
                  window.innerWidth <
                  768
                    ? "none"
                    : "flex",

                alignItems: "center",

                width: "260px",

                padding:
                  "12px 18px",

                borderRadius:
                  "999px",

                background:
                  "rgba(255,255,255,0.04)",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                backdropFilter:
                  "blur(10px)",
              }}
            >
              <Search
                size={16}
                color="#777"
              />

              <input
                type="text"
                placeholder="Buscar produtos..."
                style={{
                  background:
                    "transparent",
                  border: "none",
                  outline: "none",
                  color: "#fff",
                  marginLeft: "10px",
                  width: "100%",
                  fontSize: "14px",
                }}
              />
            </div>

            {/* MOBILE MENU */}
            <button
              onClick={() =>
                setIsMobileMenuOpen(
                  !isMobileMenuOpen
                )
              }
              style={{
                width: "50px",
                height: "50px",
                borderRadius:
                  "999px",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                background:
                  "rgba(255,255,255,0.04)",
                color: "#fff",
                cursor: "pointer",
                display:
                  window.innerWidth >=
                  768
                    ? "none"
                    : "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
              }}
            >
              {isMobileMenuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MENU MOBILE */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
          }}
          style={{
            position: "fixed",
            top: "90px",
            left: 0,
            width: "100%",
            background: "#050505",
            padding: "30px",
            zIndex: 998,
            borderTop:
              "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: "25px",
            }}
          >
            <a
              href="#"
              style={{
                color: "#fff",
                textDecoration:
                  "none",
                fontWeight: "bold",
              }}
            >
              INÍCIO
            </a>

            <a
              href="#products"
              style={{
                color: "#888",
                textDecoration:
                  "none",
                fontWeight: "bold",
              }}
            >
              PRODUTOS
            </a>

            <a
              href="#about"
              style={{
                color: "#888",
                textDecoration:
                  "none",
                fontWeight: "bold",
              }}
            >
              SOBRE
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Navbar;