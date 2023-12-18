import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import { Formik, FormikHelpers } from 'formik';
import { isEmpty } from 'lodash-es';
import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Masks } from 'react-native-mask-input';
import { scale } from 'react-native-size-matters';
import BaseButton from '../../components/button/BaseButton';
import InputField from '../../components/input/InputField';
import { Header } from '../../components/screens/main';
import {
  SecureMasterCard,
  SecureOmise,
  SecureVisa,
} from '../../components/svg';
import { CREDIT_CARD_VALUE } from '../../constants/defaults';
import {
  MAIN_STACK,
  MainStackScreenNavigation,
} from '../../constants/screens/main';
import {
  CreditCardSchema,
  cvvMask,
  expiryDateMask,
  formikCreditCardSchema,
} from '../../schemas/card';
import { handleCreationError } from '../../utils/errors/common';
import { COLOR_PALETTE } from '../../utils/theme';

function AddCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation =
    useNavigation<MainStackScreenNavigation<typeof MAIN_STACK.ADD_CARD>>();

  const onBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onSubmit = useCallback(
    async (
      values: CreditCardSchema,
      formikHelper: FormikHelpers<CreditCardSchema>
    ) => {
      try {
        setIsSubmitting(true);

        console.log(values);

        onBack();
      } catch (error) {
        if (error instanceof AxiosError) {
          handleCreationError(error, formikHelper);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [onBack]
  );

  return (
    <View style={style.mainContainer}>
      <Header withBack onBack={onBack} />
      <Formik<CreditCardSchema>
        validationSchema={formikCreditCardSchema}
        initialValues={CREDIT_CARD_VALUE}
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
            <ScrollView style={style.formContainer}>
              <InputField
                label={'ATM/Debit/Credit card number'}
                errorMessage={errors.number}
                onChangeText={handleChange('number')}
                onBlur={handleBlur('number')}
                isValid={touched.number && !errors.number}
                isError={touched.number && !!errors.number}
                placeholder={'0000 0000 0000'}
                mask={Masks.CREDIT_CARD}
                value={values.number}
              />
              <InputField
                label={'Name on Card'}
                errorMessage={errors.cardHolder}
                onChangeText={handleChange('cardHolder')}
                onBlur={handleBlur('cardHolder')}
                isValid={touched.cardHolder && !errors.cardHolder}
                isError={touched.cardHolder && !!errors.cardHolder}
                placeholder={'Ty Lee'}
                value={values.cardHolder}
              />
              <View style={{ flexDirection: 'row' }}>
                <InputField
                  label={'Expiry Date'}
                  errorMessage={errors.expiryDate}
                  onChangeText={handleChange('expiryDate')}
                  onBlur={handleBlur('expiryDate')}
                  isValid={touched.expiryDate && !errors.expiryDate}
                  isError={touched.expiryDate && !!errors.expiryDate}
                  placeholder={'MM/YY'}
                  mask={expiryDateMask}
                  value={values.expiryDate}
                  containerStyle={{
                    flex: 1,
                  }}
                />
                <InputField
                  label={'CVV'}
                  errorMessage={errors.cvv}
                  onChangeText={handleChange('cvv')}
                  onBlur={handleBlur('cvv')}
                  isValid={touched.cvv && !errors.cvv}
                  isError={touched.cvv && !!errors.cvv}
                  mask={cvvMask}
                  value={values.cvv}
                  containerStyle={{
                    flex: 1,
                  }}
                />
              </View>
              <View style={style.secureContainer}>
                <SecureVisa width={scale(100)} />
                <SecureMasterCard width={scale(100)} />
                <SecureOmise width={scale(100)} />
              </View>
            </ScrollView>
            <View style={style.formFooter}>
              <BaseButton
                title="Add Card"
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
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLOR_PALETTE.WHITE,
    height: '100%',
    width: '100%',
    flex: 1,
  },
  formContainer: {
    padding: scale(15),
    flex: 1,
  },
  get formFooter() {
    return {
      padding: this.formContainer.padding,
      alignItems: 'center',
    } satisfies ViewStyle;
  },
  secureContainer: {
    paddingTop: scale(10),
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default AddCard;
