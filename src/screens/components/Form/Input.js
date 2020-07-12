import React from 'react'
import {
  StyleSheet,
  TextInput
} from 'react-native'
import {
  View,
  Item,
  Text,
  Icon
} from 'native-base'
import color from 'theme/color'

const styles = StyleSheet.create({
  column: {
    minHeight: 60,
    flex: 1,
    flexDirection: 'column'
  },
  item: {
    flex: 1,
    backgroundColor: color.textIcons,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    minHeight: 40,
    maxHeight: 40
  },
  icon: {
    fontSize: 20,
    color: color.secondaryText
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
    padding: 0,
    minHeight: 40,
    height: '100%',
    width: '100%',
    fontSize: 16
  },
  error: {
    textAlign: 'right',
    color: color.errorColor
  }
})

const renderInput = ({
  input,
  placeholder,
  keyboardType = 'default',
  maxLength = 30,
  autoFocus,
  iconType = 'FontAwesome',
  iconName,
  disabled,
  onSubmitEditing,
  secureTextEntry = false,
  textAlignVertical = 'center',
  iconRight,
  meta: {
    touched,
    error
  }
}) => {
  if (keyboardType === 'numeric') {
    input.value = (`${Number(input.value)}` || '').replace(/[^\d]/g, '')
    input.onChange(input.value)
  } else if (keyboardType === 'phone-pad') {
    input.value = (`${input.value}` || '').replace(/[^\d]/g, '')
    input.onChange(input.value)
  }

  return (
    <View style={styles.column}>
      <Item
        regular
        style={styles.item}
        error={!!error && touched}
      >
        {iconName && (
          <Icon
            active
            style={styles.icon}
            type={iconType}
            name={iconName}
          />
        )}
        <TextInput
          disabled={disabled}
          autoFocus={autoFocus}
          style={styles.input}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          selectTextOnFocus
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
          autoCapitalize="none"
          textAlignVertical={textAlignVertical}
          onSubmitEditing={onSubmitEditing}
          {...input}
        />
        {iconRight}
      </Item>
      {error && touched && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default renderInput
