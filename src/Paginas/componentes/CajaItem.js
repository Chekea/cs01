import { useTheme } from "@emotion/react";
import { Box, Typography, createTheme, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { extract } from "../../ayuda";

function CajaItem({ dats, venta }) {
  const navigate = useNavigate();
  const theme = createTheme(); // Create a theme instance
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = useState(dats);

  const handleClick = (codigo, context) => {
    venta
      ? navigate(`/Ventas/Detalles/${codigo}`)
      : navigate(`/Exterior/Detalles/${codigo}/${context}`);
    // Navigate to the details page with codigo and context as URL parameters
  };

  return dats?.map((item) => (
    <Box
      onClick={() => handleClick(item.Codigo, item.Contexto)}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
        padding: "8px",
        borderRadius: "4px",
        width: "80vw", // Set width to 100% to adjust to screen size
        flexGrow: 1, // Allow the Box to grow to fill available space
        flexShrink: 1, // Allow the Box to shrink if necessary
        overflowX: "hidden", // Hide overflow to prevent horizontal scrolling

        maxWidth: isMobile ? "100%" : "90vw", // Conditionally set maxWidth based on screen size
      }}
      key={item.Codigo}
    >
      <Typography>{item.CompraId}</Typography>
      <Typography>{item.Estado}</Typography>
    </Box>
  ));
}

export default CajaItem;

// <View style={styles.abajo}>
//   <View
//     style={{
//       backgroundColor: "#fff",
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//     }}
//   >
//     <View
//       style={{
//         flex: 1,
//         marginHorizontal: 2,
//         flexDirection: "row",
//         alignItems: "center",
//         color: "gray",

//         justifyContent: "space-around",
//       }}
//     >
//       <Pressable onPress={handleOpenCarrito}>
//         <Icon
//           style={{
//             alignItems: "center",
//             color: "gray",
//             marginHorizontal: 2,

//             textAlign: "center",
//           }}
//           name="shoppingcart"
//           size={screenSizes(28)}
//         />
//       </Pressable>

//       <Pressable onPress={handleFavoritos}>
//         <Icon
//           style={{
//             color: MainColor,
//             textAlign: "center",
//           }}
//           name={pulsar ? "heart" : "hearto"}
//           size={screenSizes(28)}
//         />
//       </Pressable>
//     </View>
//     {!stock ? (
//       <Textos
//         titulo={"AGOTADA"}
//         padtotal={20}
//         familia={semibold}
//         size={18}
//         color={"white"}
//         back={Rojo}
//       />
//     ) : (
//       <View
//         style={{
//           flexDirection: "row",

//           justifyContent: "center",
//         }}
//       >
//         {contexto === "Exterior" ? (
//           envio !== "Maritima" ? (
//             <Textos
//               titulo={"AL CARRITO"}
//               padtotal={20}
//               familia={semibold}
//               size={18}
//               color={MainColor}
//               back={"white"}
//               funcion={() => handleComprar("Carrito")}
//             />
//           ) : null
//         ) : null}
//         <Textos
//           titulo={"COMPRAR"}
//           padtotal={20}
//           familia={semibold}
//           size={18}
//           color={"white"}
//           back={descuento !== 0 ? Rojo : MainColor}
//           funcion={() => handleComprar("Comprar")}
//         />
//       </View>
//     )}
//   </View>
// </View>;

// //

// // export default function Signin({navigation}) {
// //   const EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use';
// //   const INVALID_EMAIL = 'auth/invalid-email';

// //   const [previs, setPrevis] = useState(false);

// //   const correoref = useRef('');
// //   const contraref = useRef('');
// //   const nombreref = useRef('');
// //   const contactoref = useRef('');

// //   const ref_input2 = useRef();
// //   const ref_input3 = useRef();

// //   const ref_input4 = useRef();

// //   // Handle user state changes
// //   function onAuthStateChanged(user) {
// //     setUser(user);
// //   }

// //   let analizara = async () => {
// //     try {
// //       // ... (existing code)
// //     } catch (error) {
// //       console.error('Error during user creation:', error);
// //       setPrevis(false);
// //       // Handle the error appropriately, e.g., show an error message
// //     }
// //   };
// //   let crearUser = async (correo, contrasexa) => {
// //     try {
// //       auth().createUserWithEmailAndPassword(
// //         correo.toLocaleLowerCase(),
// //         contrasexa,
// //       );
// //     } catch (error) {
// //       if (error.code === EMAIL_ALREADY_IN_USE) {
// //         snack('Correo Electronico ya existente');
// //       }

// //       if (error.code === INVALID_EMAIL) {
// //         snack('Correo Electronico invalido');
// //         console.log('That email address is invalid!');
// //       }
// //       setPrevis(false);
// //     }
// //   };
// //   let saveUserData = async (id, nombre, contacto, correo, contrasexa) => {
// //     try {
// //       Subirdatos(
// //         {
// //           Nombre: nombre,
// //           Contacto: '+240' + contacto,
// //           Imagen: '',
// //           Id: id,
// //           Email: correo,
// //         },
// //         `GE/Comprador/${id}`,
// //       );
// //       AsyncStorage.setItem('nombre', nombre);
// //       AsyncStorage.setItem('imagen', '');
// //       AsyncStorage.setItem('direccion', '');
// //       AsyncStorage.setItem('contacto', contacto);
// //       AsyncStorage.setItem('contraseña', contrasexa);
// //       handleCerrar(navigation);
// //       handleCerrar(navigation);

// //       navigation.reset({
// //         index: 0,
// //         routes: [{name: 'Nacional'}],
// //       });
// //       setPrevis(false);
// //     } catch (error) {
// //       console.error('Error during saving user data:', error);
// //       throw error; // Propagate the error for better error handling
// //     }
// //   };
// //   const handleDataFetchError = error => {
// //     Mostrardialogo('Error', 'Ha ocurrido un error inesperado', () => {}, true);
// //   };

// //   let analizar = async () => {
// //     let correo = correoref.current;
// //     let contrasexa = contraref.current;
// //     let nombre = nombreref.current;
// //     let contacto = contactoref.current;

// //     if (
// //       correo !== '' &&
// //       contrasexa !== '' &&
// //       nombre !== '' &&
// //       contacto !== ''
// //     ) {
// //       if (contrasexa.length >= 6 && contacto.length === 9) {
// //         setPrevis(!previs);

// //         try {
// //           const userCredential = await auth().createUserWithEmailAndPassword(
// //             correo.toLocaleLowerCase(),
// //             contrasexa,
// //           );
// //           const {user} = userCredential;

// //           await saveUserData(user.uid, nombre, contacto, correo, contrasexa);
// //         } catch (error) {
// //           setPrevis(false);
// //           // handleDataFetchError();
// //         }
// //       } else {
// //         snack('Contraseña corta o numero de telefono incorrecto');
// //       }
// //     } else {
// //       snack('Rellene todos los campos');
// //     }
// //   };

// //   useEffect(() => {
// //     navigation.setOptions({
// //       title: 'Unete a Chekea',
// //     });
// //   }, []);
// //   return (
// //     <View style={styles.container}>
// //       <ScrollView
// //         alwaysBounceVertical={false}
// //         contentContainerStyle={{flexGrow: 1}}>
// //         <View style={{flex: 1, marginTop: 25}}>
// //           <Stack spacing={10} style={{marginHorizontal: 16, flex: 1}}>
// //             <TextInput
// //               placeholder="Nombre"
// //               variant="outlined"
// //               fontFamily={regular}
// //               returnKeyType="next"
// //               color={MainColor}
// //               onChangeText={e => (nombreref.current = e)}
// //               onSubmitEditing={() => ref_input2.current.focus()}
// //               blurOnSubmit={false}
// //             />
// //             <TextInput
// //               placeholder="Numero de Telefono"
// //               variant="outlined"
// //               color={MainColor}
// //               keyboardType="numeric"
// //               returnKeyType="next"
// //               fontFamily={regular}
// //               ref={ref_input2}
// //               onSubmitEditing={() => ref_input3.current.focus()}
// //               blurOnSubmit={false}
// //               onChangeText={e => (contactoref.current = e)}
// //             />

// //             <TextInput
// //               placeholder="Correo Electronico"
// //               variant="outlined"
// //               color={MainColor}
// //               fontFamily={regular}
// //               returnKeyType="next"
// //               ref={ref_input3}
// //               onSubmitEditing={() => ref_input4.current.focus()}
// //               blurOnSubmit={false}
// //               onChangeText={e => (correoref.current = e)}
// //             />
// //             <TextInput
// //               placeholder="Contraseña"
// //               variant="outlined"
// //               color={MainColor}
// //               fontFamily={regular}
// //               secureTextEntry={true}
// //               blurOnSubmit={false}
// //               ref={ref_input4}
// //               onChangeText={e => (contraref.current = e)}
// //             />

// //             <View style={{marginTop: 20}}>
// //               <Botones titulo="REGISTRARSE" funciones={() => analizar()} />
// //             </View>
// //           </Stack>
// //         </View>
// //       </ScrollView>
// //       {previs ? <Loader /> : null}
// //     </View>
// //   );
// // }
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: 'white',
// //   },
// // });
