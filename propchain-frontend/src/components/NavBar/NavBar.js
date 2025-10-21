// ✅ NavBar.js
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./NavBar.css";

const NavBar = ({ account, setAccount }) => {
  const [balance, setBalance] = useState(null);

  // ✅ گرفتن موجودی از ولت
  const getBalance = async (address) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (err) {
      console.error("Error fetching balance:", err);
      return "---";
    }
  };

  // ✅ اتصال ولت
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found. Please install it.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length > 0) {
        const walletAddress = accounts[0];
        setAccount(walletAddress); // 👈 ارسال به App.js
        const walletBalance = await getBalance(walletAddress);
        setBalance(walletBalance);
      }
    } catch (err) {
      console.error("Error connecting to wallet:", err);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  // ✅ کپی آدرس به کلیپ‌بورد
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert(`Address copied to clipboard:\n${text}`))
      .catch((err) => {
        console.error("Error copying address:", err);
        alert("Failed to copy address.");
      });
  };

  // ✅ اگر ولت از قبل وصله (Reload auto reconnect)
  useEffect(() => {
    const checkConnectedWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const walletAddress = accounts[0].address || accounts[0];
          setAccount(walletAddress);
          const walletBalance = await getBalance(walletAddress);
          setBalance(walletBalance);
        }
      }
    };
    checkConnectedWallet();

    // 👀 لیسنر برای تغییر اکانت در متامسک
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          getBalance(accounts[0]).then(setBalance);
        } else {
          setAccount(null);
          setBalance(null);
        }
      });
    }
  }, [setAccount]);

  // ✅ NavBar UI
  return (
    <AppBar
      position="sticky"
      className="navbar"
      sx={{
        background: "linear-gradient(90deg, #004CFF 0%, #005FFF 100%)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 24px" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            letterSpacing: "0.5px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          PropChain
        </Typography>

        <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Home
            </Button>
          </Link>

          <Link to="/explore" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Explore
            </Button>
          </Link>

          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "#004CFF",
                textTransform: "none",
                backgroundColor: "white",
                fontWeight: 600,
                borderRadius: "8px",
                px: 2,
                "&:hover": {
                  backgroundColor: "#f0f4ff",
                },
              }}
            >
              Register
            </Button>
          </Link>

          {/* ✅ دکمه اتصال یا نمایش ولت */}
          <Button
            id="connectButton"
            onClick={account ? () => copyToClipboard(account) : connectWallet}
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              textTransform: "none",
              borderRadius: "12px",
              padding: "8px 16px",
              fontWeight: 500,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.35)",
              },
            }}
          >
            {account
              ? `${account.slice(0, 6)}...${account.slice(-4)} - ${
                  balance ? balance.slice(0, 6) : "0.0"
                } ETH`
              : "Connect Wallet"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
