import { SelectList } from "react-native-dropdown-select-list"

import Sizes from "@/constants/Sizes"
import Colors from "@/constants/Colors"
import IonIcon from "@/components/basic/IonIcon"

interface SelectInputData {
  key: string
  value: string
  disabled?: boolean
}

interface SelectInputProps {
  save: "key" | "value"
  data: SelectInputData[]
  defaultOption?: SelectInputData
  setSelected: (selected: string) => void
}

export default function SelectInput({ save, data, setSelected, defaultOption }: SelectInputProps) {
  return (
    <SelectList
      save={save}
      data={data}
      setSelected={setSelected}
      defaultOption={defaultOption}
      search={false}
      arrowicon={<IonIcon name="chevron-down" />}
      boxStyles={{
        borderWidth: 0,
        borderRadius: Sizes.micro,
        backgroundColor: Colors.light.gray.light,
      }}
      inputStyles={{
        padding: 0,
        fontSize: Sizes.medium,
        fontFamily: "Nunito_600SemiBold",
      }}
      dropdownStyles={{
        borderWidth: 0,
        borderRadius: Sizes.micro,
        backgroundColor: Colors.light.gray.light,
      }}
      dropdownTextStyles={{
        paddingVertical: 2,
        fontSize: Sizes.medium,
        fontFamily: "Nunito_400Regular",
      }}
    />
  )
}
