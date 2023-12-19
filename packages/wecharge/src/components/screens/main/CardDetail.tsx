import { ScreenHeight, ScreenWidth } from '@rneui/base';
import { Overlay } from '@rneui/themed';
import { AxiosError } from 'axios';
import { Formik, FormikHelpers } from 'formik';
import { isEmpty } from 'lodash-es';
import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { CHARGE_VALUE } from '../../../constants/defaults';
import { FONT_SIZE, FONT_SIZE_TYPE } from '../../../constants/fonts';
import { ChargeSchema, formikChargeSchema } from '../../../schemas/card';
import { chargeCard, deleteCard } from '../../../store/actions/card';
import useCardStore from '../../../store/state/card';
import useCommonStore from '../../../store/state/common';
import { handleCreationError } from '../../../utils/errors/common';
import { COLOR_PALETTE, opacityColor } from '../../../utils/theme';
import BaseButton from '../../button/BaseButton';
import InputField from '../../input/InputField';
import RequiredLabel from '../../label/RequiredLabel';

function CardDetail() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isVisible, setIsVisible, selected, setSelected } = useCommonStore(
    (state) => ({
      isVisible: state.isSelecting,
      setIsVisible: state.setIsSelecting,
      selected: state.selected,
      setSelected: state.setSelected,
    })
  );
  const card = useCardStore((state) =>
    state.cards.find((c) => c._id === selected)
  );

  const onClose = useCallback(() => {
    setIsVisible(false);
    setSelected('');
  }, [setIsVisible, setSelected]);

  const onSubmit = useCallback(
    async (values: ChargeSchema, formikHelper: FormikHelpers<ChargeSchema>) => {
      if (!card) return;

      try {
        setIsSubmitting(true);

        await chargeCard(card._id, values);

        onClose();
      } catch (error) {
        if (error instanceof AxiosError) {
          handleCreationError(error, formikHelper);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [onClose, card]
  );

  const onDelete = useCallback(async () => {
    if (!card) return;

    try {
      setIsSubmitting(true);

      await deleteCard(card._id);

      onClose();
    } finally {
      setIsSubmitting(false);
    }
  }, [onClose, card]);

  if (!card) return null;

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationType="fade"
      onRequestClose={onClose}
      backdropStyle={{ backgroundColor: opacityColor('#000', 0.5) }}
      supportedOrientations={['portrait']}
      hardwareAccelerated
      overlayStyle={style.ovelaryContainer}
    >
      <Formik<ChargeSchema>
        validationSchema={formikChargeSchema}
        initialValues={CHARGE_VALUE}
        onSubmit={onSubmit}
      >
        {({
          errors,
          handleBlur,
          handleSubmit,
          handleChange,
          touched,
          values,
        }) => (
          <View style={style.formContainer}>
            <RequiredLabel style={style.formTitle}>
              Charge Credit Card
            </RequiredLabel>
            <KeyboardAvoidingView style={{ flex: 1 }}>
              <ScrollView style={{ flex: 1 }}>
                <InputField
                  label={'Amount'}
                  errorMessage={errors.amount}
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  isValid={touched.amount && !errors.amount}
                  isError={touched.amount && !!errors.amount}
                  placeholder={'Your amount to charge'}
                  value={values.amount}
                  disabled={isSubmitting}
                />
                <InputField
                  label={'Payment Currency'}
                  errorMessage={errors.currency}
                  onChangeText={handleChange('currency')}
                  onBlur={handleBlur('currency')}
                  isValid={touched.currency && !errors.currency}
                  isError={touched.currency && !!errors.currency}
                  value={values.currency}
                  placeholder={'Charge currency'}
                  disabled
                />
              </ScrollView>
              <View style={{ alignItems: 'center', rowGap: scale(5) }}>
                <BaseButton
                  title="Charge"
                  disabled={!isEmpty(errors)}
                  onPress={handleSubmit as never}
                  loading={isSubmitting}
                  containerStyle={{
                    width: '95%',
                  }}
                />
                <BaseButton
                  title="Delete"
                  onPress={onDelete}
                  disabled={isSubmitting}
                  buttonStyle={{
                    backgroundColor: COLOR_PALETTE.DANGER_MAIN,
                  }}
                  containerStyle={{
                    width: '95%',
                  }}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
        )}
      </Formik>
    </Overlay>
  );
}

const style = StyleSheet.create({
  ovelaryContainer: {
    borderRadius: scale(10),
    backgroundColor: 'white',
  },
  formContainer: {
    height: ScreenHeight * 0.4,
    width: ScreenWidth * 0.75,
    justifyContent: 'center',
    alignSelf: 'center',
    rowGap: scale(10),
  },
  formTitle: {
    textAlign: 'center',
    width: '100%',
    fontWeight: '900',
    fontSize: FONT_SIZE[FONT_SIZE_TYPE.SMALL],
    textTransform: 'uppercase',
  },
});

export default CardDetail;
