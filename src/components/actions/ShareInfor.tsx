import React from "react";
import { Box, Button, useSnackbar } from "zmp-ui";
import zmp from "zmp-sdk";
import images from "assets/images";
import { openUrlInWebview } from "services/zalo";
import { copyToClipboard } from "utils/copyToClipboard";
import { useTranslation } from "react-i18next";

const ShareInfor: React.FC = () => {
    const { openSnackbar } = useSnackbar();
    const link = window.location.href;
    const { t: tPage } = useTranslation("page");

    const handleCopy = async () => {
        
        copyToClipboard(
            link,
            () => openSnackbar({
                icon: true,
                text: "Sao chép thành công",
                type: 'success',
                action: { text: "Đóng", close: true },
                duration: 3000,
            }),
            () => openSnackbar({
                icon: true,
                text: "Sao chép không thành công",
                type: 'error',
                action: { text: "Đóng", close: true },
                duration: 3000,
            })
        );
    };

    const handleShareZalo = () => {
        zmp.openShareSheet({
            type: "link",
            data: { link, chatOnly: false },
        })
            .then(() => {
                openSnackbar({ text: "Chia sẻ thành công", type: "success", action: { text: "Đóng", close: true }, duration: 3000 });
            })
            .catch(() => {
                openSnackbar({ text: "Chia sẻ thất bại", type: "error", action: { text: "Đóng", close: true }, duration: 3000 });
            });
    };

    const handleShareSocial = async (platform: string) => {
        let shareUrl = "";
        switch (platform) {
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(link)}`;
                break;
            default:
                return;
        }

        try {
            await openUrlInWebview(shareUrl, "bottomSheet");
        } catch (err) {
            console.error("Lỗi mở WebView:", err);
        }
    };

    return (
        <Box pb={4} pt={8}>
            <h3 className="text-[18px] font-semibold text-[#355933] mb-2">{tPage("share")}</h3>
            <div className="flex flex-wrap mt-3 gap-4">
                <Box onClick={handleShareZalo}>
                    <img className="w-[36px]" src={images.zalo} alt="Zalo" />
                </Box>
                <Box onClick={() => handleShareSocial("facebook")} >
                    <img className="w-[36px]" src={images.facebook} alt="Facebook" />
                </Box>
                <Box onClick={() => handleShareSocial("twitter")}>
                    <img className="w-[36px]" src={images.twitter} alt="Twitter" />
                </Box>
                <Box onClick={() => handleCopy()}>
                    <img className="w-[36px]" src={images.link} alt="Copy" />
                </Box>
            </div>
        </Box>
    );
};

export default ShareInfor;
