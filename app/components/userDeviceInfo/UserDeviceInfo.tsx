import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, CircularProgress, Divider, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField, Typography } from '@mui/material'
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
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MdClose, MdDone } from 'react-icons/md';
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
    const [step, setStep] = useState(1)

    const { data: session, status } = useSession()
    // Создаем ссылку на элемент input
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);// предварительный просмотр
    const [fixFile, setFixFile] = useState(1)
    const [changeName, setChangeName] = useState<string>('');// смена имени
    const [isNameDone, setIsNameDone] = useState<boolean>(false);
    // Функция для программного клика по скрытому input
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
    // Обработчик события изменения файла
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            // Создаем URL для предварительного просмотра изображения
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // добавить логику для загрузки изображения на сервер здесь
            console.log(file.name);
        } else {
            console.error('Выбранный файл не является изображением');
        }
    };

    //изменение имени
    const handleDoneClick = () => {
        setChangeName(changeName);
        setIsNameDone(true);

    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangeName(event.target.value);
        setIsNameDone(false);
    };
    // Обработчик для сброса изменений
    const handleCancelClick = () => {
        setChangeName('');
        // setIsNameDone(true);
    };

    // Функция для сброса всех состояний к исходным значениям
    const handleResetAll = () => {
        // setStep(1);
        setPreview(null);
        setFixFile(1);
        setChangeName('');
        setIsNameDone(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'p' || event.key === 'P') {
            event.stopPropagation(); // Предотвращение распространения события
        }
    };

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

        if (navigator.getBattery) {
            navigator.getBattery().then(battery => {
                const updateBatteryInfo = () => {
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
            if (level <= 0.95) return <BatteryCharging90Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level <= 0.8) return <BatteryCharging80Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level <= 0.6) return <BatteryCharging60Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level <= 0.5) return <BatteryCharging50Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level <= 0.3) return <BatteryCharging30Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level <= 0.2) return <BatteryCharging20Icon fontSize='small' color={getBatteryColor(level)} />;
            return <BatteryCharging20Icon fontSize='small' color={getBatteryColor(level)} />;
        } else {
            if (level >= 0.95) return <BatteryFullIcon fontSize='small' color={getBatteryColor(level)} />;
            if (level >= 0.9) return <Battery90Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level >= 0.8) return <Battery80Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level >= 0.6) return <Battery60Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level >= 0.5) return <Battery50Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level >= 0.3) return <Battery30Icon fontSize='small' color={getBatteryColor(level)} />;
            if (level >= 0.2) return <Battery20Icon fontSize='small' color={getBatteryColor(level)} />;
            return <BatteryAlertIcon fontSize='small' color={getBatteryColor(level)} />;
        }
    };

    const EditProfile = (
        <>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 0.5, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography>Edit Profile</Typography>
                    {(fixFile !== 1 || isNameDone === true) && (
                        <Typography color='cyan'>save?</Typography>
                    )}
                </Box>
                {(fixFile !== 1 || isNameDone === true) && (
                    <Box sx={{ alignContent: 'center', flexDirection: 'row', display: 'flex' }}>
                        <IconButton
                            onClick={handleResetAll}
                        >
                            <MdClose cursor='pointer' size={22} fill='coral' />
                        </IconButton>
                        <IconButton onClick={() => setStep(1)}  >
                            <MdDone cursor='pointer' size={22} fill='limeGreen' />
                        </IconButton>
                    </Box>
                )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 0.5, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Avatar
                            alt={`${session?.user?.name}`}
                            src={session?.user?.image || ''}
                        />
                        <Box sx={{ textAlign: 'center' }}>
                            {fixFile === 1 ? (
                                <>
                                    <Typography fontSize={12}>
                                        click to change
                                    </Typography>
                                    <Typography fontSize={12}>
                                        max 0.5MB!
                                    </Typography>
                                </>
                            ) : (
                                <Typography fontSize={12} color='yellow'>
                                    change to
                                </Typography>
                            )}
                        </Box>
                        <ChevronRightIcon />
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <IconButton sx={{
                            border: preview ? 1 : null,
                            '&.Mui-disabled': {
                                borderColor: 'cyan', // Цвет границы в заблокированном состоянии
                            }
                        }}
                            disabled={fixFile !== 1 ? true : false} size='small' onClick={handleButtonClick}>
                            {preview ? (
                                <Avatar alt="Preview" src={preview || ''} />
                            ) : (
                                <AccountCircleIcon sx={{ fontSize: '40px' }} />
                            )
                            }
                        </IconButton>

                    </Box>
                    {preview && (
                        <>
                            <Box sx={{ alignContent: 'center', flexDirection: 'row', display: 'flex' }}>
                                <IconButton disabled={fixFile !== 1 ? true : false} onClick={() => setFixFile(2)} >
                                    <MdDone cursor='pointer' size={22} fill='limeGreen' />
                                </IconButton>
                                {fixFile === 1 && (
                                    <IconButton onClick={() => setPreview(null)} >
                                        <MdClose cursor='pointer' size={22} fill='coral' />
                                    </IconButton>
                                )}
                            </Box>
                        </>
                    )}
                </Box>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1 }}>
                    <Box sx={{ width: '100%' }}>
                        <Typography gutterBottom>
                            {session?.user?.name}
                        </Typography>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1, alignItems: 'center' }}>
                            <TextField
                                fullWidth
                                variant={!isNameDone ? 'standard' : 'outlined'}
                                size='small'
                                type='text'
                                label={!isNameDone ? 'enter new name' : 'new name'}
                                placeholder='new name'
                                value={changeName}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                autoComplete='off'
                                // color='warning'
                                disabled={isNameDone}
                                margin='dense'
                                sx={{
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        // Цвет текста в заблокированном состоянии
                                        WebkitTextFillColor: 'white'
                                    },
                                    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'cyan', // Цвет границы в заблокированном состоянии
                                    },
                                    '& .MuiInputLabel-root.Mui-disabled': {
                                        color: 'yellow', // Цвет метки в заблокированном состоянии
                                    },
                                }}

                            />
                            {changeName !== '' && (
                                <>
                                    <Box sx={{ alignContent: 'center', flexDirection: 'row', display: 'flex' }}>
                                        <IconButton disabled={isNameDone} onClick={handleDoneClick} >
                                            <MdDone cursor='pointer' size={22} fill='limeGreen' />
                                        </IconButton>
                                        {isNameDone === false && (
                                            <IconButton onClick={handleCancelClick} >
                                                <MdClose cursor='pointer' size={22} fill='coral' />
                                            </IconButton>
                                        )}
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Box>

                </Box>
            </Box>
        </>
    )

    return (
        <>
            <Divider flexItem />
            {(step === 1) && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Avatar
                            alt={`${session?.user?.name}`}
                            src={session?.user?.image || ''}
                        />
                        <Box>
                            <Typography fontSize={14}>{session?.user?.name}</Typography>
                            <Typography fontSize={12} color={deviceInfo.online ? '#00FF7F' : '#FF00FF'}>{deviceInfo.online ? 'online' : 'offline'}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <IconButton onClick={() => setStep(2)} >
                            <ManageAccountsIcon />
                        </IconButton>
                    </Box>
                </Box>)}
            {(step === 2) && (EditProfile)}
            <Divider flexItem />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 1 }} >
                <Typography fontSize={14} sx={{ textAlign: 'right' }}>Device Info</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LanguageIcon fontSize='small' />
                    <Typography fontSize={12}>{(deviceInfo.language === "") ? deviceInfo.countryLanguage : deviceInfo.language}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {(deviceInfo.browserName === 'Chrome') ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 20, height: 20 }}><FaChrome /></Box> :
                        (deviceInfo.browserName === 'Safari') ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 20, height: 20 }}><ImSafari /></Box> :
                            (deviceInfo.browserName === 'Opera') ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 20, height: 20 }}><FaOpera /></Box> :
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
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {
                        (deviceInfo.device === 'Apple Macintosh') ? <LaptopMacIcon fontSize='small' /> :
                            (deviceInfo.device === 'Apple iPhone') ? <PhoneIphoneIcon fontSize='small' /> :
                                (deviceInfo.device === 'Apple iPad') ? <TabletMacIcon fontSize='small' /> :
                                    (deviceInfo.device === 'Android Device') ? <SmartphoneIcon fontSize='small' /> :
                                        <DevicesIcon fontSize='small' />
                    }
                    <Typography fontSize={12}>
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
                    </>
                )}
            </Box>
        </>
    );
}
