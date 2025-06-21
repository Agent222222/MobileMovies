import {Image, ImageBackground, Text, View} from 'react-native';
import React from 'react'
import {Tabs} from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

const TabIcon = ({focused, title, icon}: any) => { // this is a excluded element in order not to repeat eeach navigation item styles and etc.
    if(focused){
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
                <Image
                    source={icon}
                    tintColor="#151312"
                    className="size-5"
                />
                <Text
                    className="text-secondary text-base font-semibold ml-2"
                >
                    {title}
                </Text>
            </ImageBackground>
        )
    }else{
        return (
            <View className="size-full justify-center items-center mt-4 rounded-full">
                <Image
                    source={icon}
                    tintColor="#A8B5DB"
                    className="size-5"
                />
            </View>
        )
    }
}

const Layout = () => {
    return(
       <Tabs // Tab comp in the _layout of tabs is used to hide the current route of the group
           screenOptions={{
               tabBarShowLabel: false,
               tabBarItemStyle: {
                   width: '100%',
                   height: '100%',
                   justifyContent: 'center',
                   alignItems: 'center',
               },
               tabBarStyle: {
                   backgroundColor: "#0f0D23",
                   borderRadius: 50,
                   marginHorizontal: 20,
                   marginBottom: 36,
                   height: 52,
                   position: 'absolute',
                   overflow: 'hidden',
                   borderWidth: 1,
                   borderColor: '#0f0D23',
               },
           }}
       >
           <Tabs.Screen
                name="index" // this comp helps to modify the buttom navigation part of routes we have as files
                options={{
                    title: "Home", // Home is the index.tsx comp (the title is used to Rename it as we want to)
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabIcon // that element is what we actually see in the navigation tab
                                focused={focused}
                                title="Home"
                                icon={icons.home}
                            />
                        </>
                    )
                }}
           />
           <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabIcon
                                focused={focused}
                                title="Search"
                                icon={icons.search}
                            />
                        </>
                    )
                }}
           />
           <Tabs.Screen
               name="saved"
               options={{
                   title: "Saved",
                   headerShown: false,
                   tabBarIcon: ({ focused }) => (
                       <>
                           <TabIcon
                               focused={focused}
                               title="Saved"
                               icon={icons.save}
                           />
                       </>
                   ),
               }}
           />
           <Tabs.Screen
               name="profile"
               options={{
                   title: "Profile",
                   headerShown: false,
                   tabBarIcon: ({ focused }) => (
                       <>
                           <TabIcon
                               focused={focused}
                               title="Profile"
                               icon={icons.person}
                           />
                       </>
                   ),
               }}
           />
       </Tabs>
    )
}

export default Layout;