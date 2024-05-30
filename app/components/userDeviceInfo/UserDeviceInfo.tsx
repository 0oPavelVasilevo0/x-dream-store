import React, { useEffect, useState } from 'react'
import { Avatar, Box, CircularProgress, Divider, Typography } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import DevicesIcon from '@mui/icons-material/Devices';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AppleIcon from '@mui/icons-material/Apple';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import WindowIcon from '@mui/icons-material/Window';
import AndroidIcon from '@mui/icons-material/Android';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import { ImSafari } from "react-icons/im";
import { FaChrome } from "react-icons/fa6";
import { FaOpera } from "react-icons/fa6";
import PowerIcon from '@mui/icons-material/Power';
import PowerOffIcon from '@mui/icons-material/PowerOff';
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import BatteryCharging30Icon from '@mui/icons-material/BatteryCharging30';
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';
import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging20';
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging20';
import BatteryCharging90Icon from '@mui/icons-material/BatteryCharging20';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import Battery20Icon from '@mui/icons-material/Battery20';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery60Icon from '@mui/icons-material/Battery60';
import Battery80Icon from '@mui/icons-material/Battery80';
import Battery90Icon from '@mui/icons-material/Battery90';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import UAParser from 'ua-parser-js'
import { useSession } from 'next-auth/react';

interface DeviceInfoState {
    userAgent: string;
    platform: string;
    deviceModel: string;
    language: string;
    countryLanguage: string;
    browser: string;
    browserName: string;
    os: string;
    device: string;
    deviceNoname: string;
    online: boolean;
}

interface BatteryInfoState {
    charging: boolean;
    level: number;
    dischargingTime: number | null,
    chargingTime: number | null;
}

const getPlatform = (userAgent: string): string => {
    if (/windows/i.test(userAgent)) {
        return 'Windows';
    } else if (/macintosh/i.test(userAgent)) {
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
    // const [language, setLanguage] = useState<string>('unknown');

    const { data: session, status } = useSession()

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const countryLanguage = navigator.language;
        const language = countryLanguage.includes('-') ? countryLanguage.split('-')[1] : countryLanguage; // Получаем код страны
        const platform = getPlatform(userAgent);
        const online = navigator.onLine;

        const parser = new UAParser();
        const result = parser.getResult();
        const deviceModel = result.device.model || 'Unknown';

        const browser = `${result.browser.name} ${result.browser.version}`;
        const browserName = `${result.browser.name}`;
        const os = `${result.os.name} ${result.os.version}`;
        // const device = result.device?.vendor ? `${result.device.vendor} ${result.device.model}` : 'Android Device';
        const device = (result.device?.vendor !== undefined) ? `${result.device.vendor} ${result.device.model}` : 'Android Device';
        // const deviceNoname = result.device?.vendor ? `${result.device.vendor}` : 'Android Device';
        //platform


        setDeviceInfo({
            browser,
            browserName,
            os,
            device,
            // deviceNoname,
            userAgent,
            deviceModel,
            language,
            countryLanguage,
            online,
            platform,
        });

        // if (navigator.getBattery) {
        //     navigator.getBattery().then(battery => {
        //         setBatteryInfo({
        //             charging: battery.charging,
        //             level: battery.level,
        //         });

        //         battery.addEventListener('chargingchange', () => {
        //             setBatteryInfo(prevState => ({
        //                 ...prevState,
        //                 charging: battery.charging,
        //             }));
        //         });

        //         battery.addEventListener('levelchange', () => {
        //             setBatteryInfo(prevState => ({
        //                 ...prevState,
        //                 level: battery.level,
        //             }));
        //         });
        //     });
        // }



        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                const updateBatteryInfo = () => {
                    // console.log('Battery Info:', {
                    //     charging: battery.charging,
                    //     level: battery.level,
                    //     dischargingTime: battery.dischargingTime,
                    //     chargingTime: battery.chargingTime,
                    // });
                    setBatteryInfo({
                        charging: battery.charging,
                        level: battery.level,
                        dischargingTime: battery.dischargingTime === Infinity ? null : battery.dischargingTime,
                        chargingTime: battery.chargingTime === Infinity ? null : battery.chargingTime,
                    });
                };

                updateBatteryInfo();

                battery.addEventListener('chargingchange', updateBatteryInfo);
                battery.addEventListener('levelchange', updateBatteryInfo);
                battery.addEventListener('dischargingtimechange', updateBatteryInfo);
                battery.addEventListener('chargingtimechange', updateBatteryInfo);

                // if (navigator.getBattery) {
                //     const updateBatteryInfo = (battery: BatteryManager) => {
                //         console.log('Battery Info:', {
                //             charging: battery.charging,
                //             level: battery.level,
                //             dischargingTime: battery.dischargingTime,
                //             chargingTime: battery.chargingTime,
                //         });

                //         setBatteryInfo({
                //             charging: battery.charging,
                //             level: battery.level,
                //             dischargingTime: battery.dischargingTime === Infinity ? null : battery.dischargingTime,
                //             chargingTime: battery.chargingTime === Infinity ? null : battery.chargingTime,
                //         });
                //     };

                //     navigator.getBattery().then(battery => {
                //         updateBatteryInfo(battery);

                //         battery.addEventListener('chargingchange', () => updateBatteryInfo(battery));
                //         battery.addEventListener('levelchange', () => updateBatteryInfo(battery));
                //         battery.addEventListener('dischargingtimechange', () => updateBatteryInfo(battery));
                //         battery.addEventListener('chargingtimechange', () => updateBatteryInfo(battery));

                //         // Установим интервал для регулярного опроса состояния батареи
                //         const intervalId = setInterval(() => updateBatteryInfo(battery), 1000); // Опрос каждую минуту

                //         // Очистка интервала при размонтировании компонента
                //         return () => clearInterval(intervalId);

            }).catch(error => {
                console.error('Failed to get battery information:', error);
            });
        } else {
            console.log('Battery API not supported on this browser.');
        }

        // console.log(language)
        // console.log(browser)
        // console.log(os)
        // console.log(device)
        // console.log(deviceModel)
        // console.log(userAgent)
        // console.log(platform)
        //  // console.log(setBatteryInfo(batteryInfo))
        // console.log(deviceNoname)
        // console.log(online)
    }, []);

    useEffect(() => {
        if (batteryInfo.level !== undefined) {
            console.log('Battery Info:', batteryInfo);
        }
    }, [batteryInfo]);

    const load = (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Typography fontSize={12}>counting in progress</Typography>
            <CircularProgress size={'16px'} />
        </Box>
    )

    const formatTimeInMinutes = (time: number | null) => {
        if (time === null) {
            return '...';
        }
        return (time / 60).toFixed(0);
    };

    // Доп цвета для батареи
    const getBatteryColor = (level: number) => {
        if (level >= 1) return 'primary';
        if (level > 0.9) return 'primary';
        if (level > 0.8) return 'warning';
        if (level > 0.6) return 'warning';
        if (level > 0.5) return 'warning';
        if (level > 0.3) return 'warning';
        if (level > 0.2) return 'error';
        return 'error';
    };

    // Выбор иконки в зависимости от уровня заряда
    const getBatteryIcon = (level: number, charging: boolean) => {
        //charging
        if (charging === true) {
            if (level <= 1) return <BatteryChargingFullIcon fontSize='small' color={getBatteryColor(level)} />;
            if (level < 0.95) return <BatteryCharging90Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level < 0.8) return <BatteryCharging80Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level < 0.6) return <BatteryCharging60Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level < 0.5) return <BatteryCharging50Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level < 0.3) return <BatteryCharging30Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level < 0.2) return <BatteryCharging20Icon fontSize='small' color={getBatteryColor(level)} />;
            return <BatteryCharging20Icon fontSize='small' color={getBatteryColor(level)} />;
        } else {
            if (level >= 0.95) return <BatteryFullIcon fontSize='small' color={getBatteryColor(level)} />;
            if (level > 0.9) return <Battery90Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level > 0.8) return <Battery80Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level > 0.6) return <Battery60Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level > 0.5) return <Battery50Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level > 0.3) return <Battery30Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level > 0.2) return <Battery20Icon fontSize='small' color={getBatteryColor(level)} />;
            return <BatteryAlertIcon fontSize='small' color={getBatteryColor(level)} />;
        }
    };

    return (
        <>
            <Divider flexItem />
            <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: 2 }}>
                <Avatar
                    alt={`${session?.user?.name}`}
                    src={session?.user?.image || ''}
                />
                <Box>
                    <Typography fontSize={14}>{session?.user?.name}</Typography>
                    <Typography fontSize={12} color={deviceInfo.online ? '#00FF7F' : '#FF00FF'}>{deviceInfo.online ? 'online' : 'offline'}</Typography>
                </Box>
            </Box>
            <Divider flexItem />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 1 }} >
                <Typography fontSize={14} sx={{ textAlign: 'right' }}>Device Info</Typography>
                {/* <Typography><strong>User Agent:</strong> {deviceInfo.userAgent}</Typography> */}
                {/* <Typography>
                    {(deviceInfo.platform === 'MacOS') ? <AppleIcon fontSize='small' /> :
                        (deviceInfo.platform === 'Windows') ? <WindowIcon fontSize='small' /> :
                            (deviceInfo.platform === 'Android') ? <AndroidIcon fontSize='small' /> :
                                (deviceInfo.platform === 'IOS') ? <AppleIcon fontSize='small' /> :
                                    <DisplaySettingsIcon fontSize='small' />}
                    {deviceInfo.platform}
                </Typography> */}
                {/* <Typography><strong>Device Model:</strong> {deviceInfo.deviceModel}</Typography> */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LanguageIcon fontSize='small' />
                    <Typography fontSize={12}>{(deviceInfo.language === "") ? deviceInfo.countryLanguage : deviceInfo.language}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {(deviceInfo.browserName === 'Chrome') ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 20, height: 20 }}><FaChrome /></Box> :
                        (deviceInfo.browserName === 'Safari') ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 20, height: 20 }}><ImSafari fontSize='small' /></Box> :
                            (deviceInfo.browserName === 'Opera') ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 20, height: 20 }}><FaOpera fontSize='small' /></Box> :
                                <TravelExploreIcon fontSize='small' />}
                    <Typography fontSize={12}>{deviceInfo.browser}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {(deviceInfo.platform === 'MacOS') ? <AppleIcon fontSize='small' /> :
                        (deviceInfo.platform === 'Windows') ? <WindowIcon fontSize='small' /> :
                            (deviceInfo.platform === 'Android') ? <AndroidIcon fontSize='small' /> :
                                (deviceInfo.platform === 'iOS') ? <AppleIcon fontSize='small' /> :
                                    <AndroidIcon fontSize='small' />}
                    <Typography fontSize={12}>
                        {deviceInfo.os}
                        {/* {deviceInfo.platform} */}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {(deviceInfo.device === 'Apple Macintosh' || deviceInfo.platform === 'MacOS') ? <LaptopMacIcon fontSize='small' /> :
                        (deviceInfo.device === 'Apple iPhone' || deviceInfo.platform === 'iOS') ? <PhoneIphoneIcon fontSize='small' /> :
                            (deviceInfo.device === 'Apple iPad' || deviceInfo.platform === 'iOS') ? <TabletMacIcon fontSize='small' /> :
                                (deviceInfo.device === undefined || deviceInfo.platform === 'Android') ? <SmartphoneIcon fontSize='small' /> :
                                    <DevicesIcon fontSize='small' />
                    }
                    {/* <DevicesIcon fontSize='small' /> */}
                    <Typography fontSize={12}>
                        {/* {(deviceInfo.deviceNoname === undefined) ?
                            'Android device' : */}
                        {deviceInfo.device}
                    </Typography>
                </Box>
                {(batteryInfo.level !== undefined && batteryInfo.charging !== undefined) && (
                    <>
                        <Typography fontSize={14} sx={{ textAlign: 'right' }}>Battery Info</Typography>
                        {/* {(batteryInfo.level !== undefined && batteryInfo.charging !== undefined) ? ( */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {/* {batteryInfo.charging ? <BatteryChargingFullIcon /> : <BatteryFullIcon />} */}
                            {getBatteryIcon(batteryInfo.level, batteryInfo.charging)}
                            <Typography fontSize={12}>{(batteryInfo.level * 100).toFixed(0)}%</Typography>
                            {batteryInfo.charging ? (
                               (batteryInfo.level >= 1) ? (
                                    <Typography fontSize={12}>
                                        battery full
                                    </Typography>
                                ) : (
                                    <Typography fontSize={12}>
                                        {batteryInfo.chargingTime !== null && batteryInfo.chargingTime !== undefined ? `charging time ${formatTimeInMinutes(batteryInfo.chargingTime)} min` : (load)}
                                    </Typography>
                                )
                            ) : (
                                <Typography fontSize={12} >
                                    {batteryInfo.dischargingTime !== null && batteryInfo.dischargingTime !== undefined ? `battery time ${formatTimeInMinutes(batteryInfo.dischargingTime)} min` : (load)}
                                </Typography>
                            )}
                        </Box>
                        {/* ) : (
                     <Typography>Battery information is not available.</Typography> */}
                    </>
                )}
            </Box>
        </>
    );
}
