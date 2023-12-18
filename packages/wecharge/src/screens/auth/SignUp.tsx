import React, { useCallback, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SignUpSchema, formikSignUpSchema } from '../../schemas/auth';

import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/base';
import { AxiosError } from 'axios';
import { Formik, FormikHelpers } from 'formik';
import { isEmpty } from 'lodash-es';
import { scale } from 'react-native-size-matters';
import BaseButton from '../../components/button/BaseButton';
import InputField from '../../components/input/InputField';
import AppLabel from '../../components/label/AppLabel';
import { SIGN_UP_VALUE } from '../../constants/defaults';
import {
  AUTH_STACK,
  AuthStackScreenNavigation,
} from '../../constants/screens/auth';
import useAuthFormAnimation from '../../hooks/useAuthFormAnimation';
import { CONTAINERS, LABELS } from '../../styles';
import { handleSignUpError } from '../../utils/errors/auth';
import { COLOR_PALETTE } from '../../utils/theme';

function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { style: formStyle } = useAuthFormAnimation(true);
  const navigation =
    useNavigation<AuthStackScreenNavigation<typeof AUTH_STACK.SIGN_UP>>();

  const onPressOnSignIn = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.replace(AUTH_STACK.SIGN_IN);
  }, [navigation]);

  const onSubmit = useCallback(
    async (values: SignUpSchema, formikHelper: FormikHelpers<SignUpSchema>) => {
      try {
        setIsSubmitting(true);

        console.log(values);

        onPressOnSignIn();
      } catch (error) {
        if (error instanceof AxiosError) {
          handleSignUpError(error, formikHelper);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [onPressOnSignIn]
  );

  return (
    <View style={CONTAINERS.AUTH_CONTAINER}>
      <AppLabel />
      <Animated.View style={formStyle}>
        <Formik<SignUpSchema>
          validationSchema={formikSignUpSchema}
          initialValues={SIGN_UP_VALUE}
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
                  isRequired
                  label={'E-mail'}
                  errorMessage={errors.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  isValid={touched.email && !errors.email}
                  isError={touched.email && !!errors.email}
                  placeholder={'Your e-mail'}
                  value={values.email}
                />
                <InputField
                  isRequired
                  label={'Username'}
                  errorMessage={errors.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  isValid={touched.username && !errors.username}
                  isError={touched.username && !!errors.username}
                  placeholder={'Your username'}
                  value={values.username}
                />
                <InputField
                  isRequired
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
                  title="Sign Up"
                  disabled={!isEmpty(errors)}
                  onPress={handleSubmit as never}
                  loading={isSubmitting}
                />
              </View>
            </KeyboardAvoidingView>
          )}
        </Formik>
        <View style={styles.signUpContainer}>
          <Text style={LABELS.DEFAULT_TEXT}>Already have an account?</Text>
          <TouchableOpacity activeOpacity={0.5} onPress={onPressOnSignIn}>
            <Text style={[LABELS.DEFAULT_TEXT, styles.signUpText]}>
              Sign In
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
    color: COLOR_PALETTE.BLUE_40,
    fontWeight: 'bold',
  },
});

export default SignUp;
