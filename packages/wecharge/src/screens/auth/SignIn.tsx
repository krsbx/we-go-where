import { StackActions, useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/base';
import { AxiosError } from 'axios';
import { Formik, FormikHelpers } from 'formik';
import { isEmpty } from 'lodash-es';
import React, { useCallback, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import BaseButton from '../../components/button/BaseButton';
import InputField from '../../components/input/InputField';
import AppLabel from '../../components/label/AppLabel';
import { SIGN_IN_VALUE } from '../../constants/defaults';
import {
  AUTH_STACK,
  AuthStackScreenNavigation,
} from '../../constants/screens/auth';
import { LAUNCHER_STACK } from '../../constants/screens/launcher';
import { MAIN_STACK } from '../../constants/screens/main';
import useAuthFormAnimation from '../../hooks/useAuthFormAnimation';
import {
  SignInPayload,
  SignInSchema,
  formikSignInSchema,
} from '../../schemas/auth';
import { signIn } from '../../store/actions/auth';
import { CONTAINERS, LABELS } from '../../styles';
import { handleSignInError } from '../../utils/errors/auth';
import { COLOR_PALETTE } from '../../utils/theme';

function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { style: formStyle } = useAuthFormAnimation(true);
  const navigation =
    useNavigation<AuthStackScreenNavigation<typeof AUTH_STACK.SIGN_IN>>();

  const onPressOnSignUp = useCallback(() => {
    navigation.push(AUTH_STACK.SIGN_UP);
  }, [navigation]);

  const onSubmit = useCallback(
    async (
      values: SignInPayload,
      formikHelper: FormikHelpers<SignInSchema>
    ) => {
      try {
        setIsSubmitting(true);

        await signIn(values);

        navigation.dispatch(
          StackActions.replace(LAUNCHER_STACK.MAIN, {
            screen: MAIN_STACK.CARDS,
          })
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          handleSignInError(error, formikHelper);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [navigation]
  );

  return (
    <View style={CONTAINERS.AUTH_CONTAINER}>
      <AppLabel />
      <Animated.View style={formStyle}>
        <Formik<SignInSchema>
          validationSchema={formikSignInSchema}
          initialValues={SIGN_IN_VALUE}
          onSubmit={onSubmit}
          validateOnMount
        >
          {({
            errors,
            handleBlur,
            handleSubmit,
            handleChange,
            touched,
            values,
          }) => (
            <KeyboardAvoidingView style={{ flex: 1 }}>
              <ScrollView style={{ flex: 1 }}>
                <InputField
                  label={'E-mail/Username'}
                  errorMessage={errors.identifier}
                  onChangeText={handleChange('identifier')}
                  onBlur={handleBlur('identifier')}
                  isValid={touched.identifier && !errors.identifier}
                  isError={touched.identifier && !!errors.identifier}
                  placeholder={'Your e-mail/username'}
                  value={values.identifier}
                />
                <InputField
                  label={'Password'}
                  errorMessage={errors.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  isValid={touched.password && !errors.password}
                  isError={touched.password && !!errors.password}
                  value={values.password}
                  placeholder={'Your password'}
                  isPassword
                />
              </ScrollView>
              <View style={{ alignItems: 'center' }}>
                <BaseButton
                  title="Sign In"
                  disabled={!isEmpty(errors)}
                  onPress={handleSubmit as never}
                  loading={isSubmitting}
                  containerStyle={{
                    width: '95%',
                  }}
                />
              </View>
            </KeyboardAvoidingView>
          )}
        </Formik>
        <View style={styles.signUpContainer}>
          <Text style={LABELS.DEFAULT_TEXT}>Don't have an account?</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={onPressOnSignUp}>
            <Text style={[LABELS.DEFAULT_TEXT, styles.signUpText]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: scale(5),
  },
  signUpText: {
    color: COLOR_PALETTE.LIME,
    fontWeight: 'bold',
  },
});

export default SignIn;
