import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false); // Biến để lưu trạng thái hợp lệ

  // Hàm validate số điện thoại
  const validatePhoneNumber = (cleaned) => {
    // Số điện thoại hợp lệ phải có đúng 10 chữ số và bắt đầu bằng số 0
    return cleaned.length === 10 && cleaned.startsWith('0');
  };

  // Hàm format số điện thoại thành dạng 000 000 0000
  const formatPhoneNumber = (value) => {
    // Loại bỏ tất cả các ký tự không phải số
    const cleaned = value.replace(/\D/g, '');

    // Giới hạn đầu vào chỉ tối đa 10 chữ số
    let formatted = cleaned.slice(0, 10);

    // Format thành dạng 000 000 0000
    if (formatted.length > 6) {
      formatted = `${formatted.slice(0, 3)} ${formatted.slice(3, 6)} ${formatted.slice(6, 10)}`;
    } else if (formatted.length > 3) {
      formatted = `${formatted.slice(0, 3)} ${formatted.slice(3, 6)}`;
    }

    // Kiểm tra tính hợp lệ
    setIsValidPhone(validatePhoneNumber(cleaned));
    
    return formatted;
  };

  // Hàm xử lý khi bấm "Tiếp tục"
  const handleContinue = () => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (!validatePhoneNumber(cleaned)) {
      Alert.alert("Số điện thoại không hợp lệ", "Vui lòng nhập số điện thoại hợp lệ bắt đầu bằng số 0 và có đủ 10 chữ số.");
    } else {
      Alert.alert("Số điện thoại hợp lệ", "Bạn có thể tiếp tục.");
      // Thực hiện hành động tiếp theo (ví dụ: gọi API)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      
      <Card style={styles.card}>
        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
          maxLength={12} // Độ dài tối đa tính cả dấu cách
        />
        
        {/* Thông báo hợp lệ hay không hợp lệ */}
        {phoneNumber.length === 12 && (
          isValidPhone ? (
            <Text style={styles.validText}>Số điện thoại hợp lệ</Text>
          ) : (
            <Text style={styles.invalidText}>Số điện thoại không hợp lệ</Text>
          )
        )}
        
        <TouchableOpacity
          style={[styles.button, isValidPhone ? styles.buttonActive : styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!isValidPhone} // Nút bị vô hiệu hóa khi chưa nhập đủ 10 số hoặc không hợp lệ
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 20,
    width: '90%',
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#7e7e7e',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  validText: {
    color: 'green',
    marginBottom: 10,
  },
  invalidText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonActive: {
    backgroundColor: '#4CAF50', // Nút sáng khi số điện thoại hợp lệ
  },
  buttonDisabled: {
    backgroundColor: '#ccc', // Nút mờ khi số điện thoại không hợp lệ
  },
});
