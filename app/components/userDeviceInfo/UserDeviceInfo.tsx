import React, { useEffect, useState } from 'react'
import { Avatar, Box, Divider, Typography } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import DevicesIcon from '@mui/icons-material/Devices';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AppleIcon from '@mui/icons-material/Apple';
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import UAParser from 'ua-parser-js'
import { useSession } from 'next-auth/react';

interface DeviceInfoState {
    userAgent: string;
    platform: string;
    deviceModel: string;
    language: string;
    browser: string;
    os: string;
    device: string;
}

interface BatteryInfoState {
    charging: boolean;
    level: number;
}

const getPlatform = (userAgent: string): string => {
    if (/windows/i.test(userAgent)) {
        return 'Windows';
    } else if (/macintosh/i.test(userAgent)) {
        console.log(userAgent);
        return 'MacOS';
    } else if (/linux/i.test(userAgent)) {
        return 'Linux';
    } else if (/android/i.test(userAgent)) {
        return 'Android';
    } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        return 'iOS';
    } else {
        return 'Unknown';
    }
};
export default function UserDeviceInfo() {
    const [deviceInfo, setDeviceInfo] = useState<Partial<DeviceInfoState>>({});
    const [batteryInfo, setBatteryInfo] = useState<Partial<BatteryInfoState>>({});

    const { data: session, status } = useSession()

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const language = navigator.language;
        const platform = getPlatform(userAgent);

        const parser = new UAParser();
        const result = parser.getResult();
        const deviceModel = result.device.model || 'Unknown';

        const browser = `${result.browser.name} ${result.browser.version}`;
        const os = `${result.os.name} ${result.os.version}`;
        const device = result.device.model ? `${result.device.vendor} ${result.device.model}` : 'Unknown Device';

        setDeviceInfo({
            browser,
            os,
            device,
            userAgent,
            platform,
            deviceModel,
            language,
        });

        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                setBatteryInfo({
                    charging: battery.charging,
                    level: battery.level,
                });

                battery.addEventListener('chargingchange', () => {
                    setBatteryInfo(prevState => ({
                        ...prevState,
                        charging: battery.charging,
                    }));
                });

                battery.addEventListener('levelchange', () => {
                    setBatteryInfo(prevState => ({
                        ...prevState,
                        level: battery.level,
                    }));
                });
            });
        }
    }, []);

    return (
        <>
            <Divider flexItem />
            <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 2 }}>
                <Avatar
                    alt={`${session?.user?.name}`}
                    src={session?.user?.image || ''}
                />
                <Typography fontSize={14}>{session?.user?.name}</Typography>
            </Box>
            <Divider flexItem />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 1 }} >
                <Typography fontSize={14} sx={{ textAlign: 'right' }}>Device Info</Typography>
                {/* <Typography><strong>User Agent:</strong> {deviceInfo.userAgent}</Typography> */}
                {/* <Typography><strong>Platform:</strong> {deviceInfo.platform}</Typography> */}
                {/* <Typography><strong>Device Model:</strong> {deviceInfo.deviceModel}</Typography> */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LanguageIcon fontSize='small' />
                    <Typography fontSize={12}>{deviceInfo.language}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TravelExploreIcon fontSize='small' />
                    <Typography fontSize={12}>{deviceInfo.browser}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AppleIcon fontSize='small' />
                    <Typography fontSize={12}>{deviceInfo.os}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DevicesIcon fontSize='small' />
                    <Typography fontSize={12}>{deviceInfo.device}</Typography>
                </Box>

                <Typography fontSize={14} sx={{ textAlign: 'right' }}>Battery Info</Typography>
                {batteryInfo.level !== undefined ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {batteryInfo.charging ? <PowerIcon /> : <PowerOffIcon />}
                            <Typography fontSize={12}>{batteryInfo.charging ? 'Yes' : 'No'}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {batteryInfo.charging ? <BatteryChargingFullIcon /> : <BatteryFullIcon />}
                            <Typography fontSize={12}>{batteryInfo.level * 100}%</Typography>
                        </Box>
                    </>
                ) : (
                    <Typography>Battery information is not available.</Typography>
                )}
            </Box>
        </>
    );
}
