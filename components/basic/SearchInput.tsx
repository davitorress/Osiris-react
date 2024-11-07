import { View } from "react-native"

import Input from "@/components/basic/Input"
import IonIcon from "@/components/basic/IonIcon"

interface SearchInputProps {
  value: string
  placeholder: string
  onChange: (value: string) => void
}

export default function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <View className="w-9/12 py-1 px-2 overflow-hidden flex-row items-center justify-between border border-gray-medium rounded-full bg-white">
      <Input
        value={value}
        onChange={onChange}
        textSize="small"
        placeholder={placeholder}
        classes="bg-transparent w-[90%] p-0"
      />

      <IonIcon name="search" size="semi" color="secondary" />
    </View>
  )
}
