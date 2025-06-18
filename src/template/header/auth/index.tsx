// "use client"

// import { FC, Fragment, useState } from 'react';

// import { useTheme } from 'styled-components';

// import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';

// import * as yup from "yup";

// import api from "@services/api";

// import { Button, Input, Modal } from '@common';
// import { User, Lock, Logo } from '@svg';
// import { custom_revalidate } from '@utils/actions';
// import { UserProps } from '@global/interface';

// import Avatar from './avater';

// const schema = yup.object({
//   nickname: yup.string().required(),
//   password: yup.string().required(),
// });

// type schemaProps = yup.InferType<typeof schema>;

// const Authentication: FC<{ user: UserProps }> = ({ user }) => {
//   const themes = useTheme();

//   const { control, handleSubmit } = useForm({
//     resolver: yupResolver(schema)
//   });

//   const [modal, setModal] = useState(false);

//   const [variant, setVariant] = useState<'primary' | 'loading' | 'error'>('primary');

//   const submit = async (form: schemaProps) => {
//     setVariant('loading');

//     const data = await api.user.auth(form);

//     if (!data) {
//       setVariant('error');
//       return console.log(user);
//     };

//     setModal(false);
//     setVariant('primary');
//     custom_revalidate('/post');
//     custom_revalidate('/auth');
//   };

//   return (
//     <Fragment>
//       <Avatar user={user} onClick={setModal} />

//       <Modal as='form' open={modal} onClickOutside={setModal} style={{ padding: '20px', maxWidth: 400 }} onSubmit={handleSubmit(submit)}>
//         <Logo id="logo" width={60} height={60} stroke={themes.colors.primary} strokeWidth={8} />

//         <div style={{ height: 30 }} />

//         <Controller
//           name="nickname"
//           control={control}
//           render={({ field: { onChange } }) =>
//             <Input icon={User} placeholder="nickname" onChange={onChange} />
//           }
//         />

//         <div style={{ height: 10 }} />

//         <Controller
//           name="password"
//           control={control}
//           render={({ field: { onChange } }) =>
//             <Input icon={Lock} type='password' placeholder="password" onChange={onChange} />
//           }
//         />

//         {/* <Link href='/register' style={{ textAlign: 'end', width: '100%' }}>Criar conta agora</Link> */}

//         <div style={{ height: 5 }} />

//         <Button type="submit" variant={variant}>
//           {variant === 'error' ? 'fail' : 'login'}
//         </Button>
//       </Modal>
//     </Fragment>
//   )
// };

// export default Authentication;