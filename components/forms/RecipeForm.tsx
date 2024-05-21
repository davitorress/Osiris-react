import { View } from "react-native"
import { useRouter } from "expo-router"
import { useLayoutEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useFieldArray, useForm } from "react-hook-form"

import usePancStore from "@/storage/panc"
import { RecipeData, recipeSchema } from "./types"

import Sizes from "@/constants/Sizes"
import Input from "@/components/basic/Input"
import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import SelectInput from "@/components/basic/SelectInput"
import ButtonThemed from "@/components/themed/ButtonThemed"
import InputErrorMessage from "@/components/basic/InputErrorMessage"

interface RecipeFormProps {
  data?: RecipeData
  onSubmit: (data: RecipeData) => void
}

export default function RecipeForm({ data, onSubmit }: RecipeFormProps) {
  const router = useRouter()
  const { pancs } = usePancStore()

  const {
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeData>({
    values: data,
    defaultValues: {
      name: "",
      description: "",
      ingredients: [""],
      preparation: [""],
      pancs: [pancs.at(0)!.name],
    },
    resolver: zodResolver(recipeSchema),
  })

  const {
    append: appendPanc,
    remove: removePanc,
    fields: pancsFields,
  } = useFieldArray({
    control,
    name: "pancs" as never,
  })
  const addNewPanc = () => {
    appendPanc(pancs.at(0)!.name)
  }
  const removeLastPanc = () => {
    if (pancsFields.length > 1) removePanc(pancsFields.length - 1)
  }

  const {
    append: appendIngredient,
    remove: removeIngredient,
    fields: ingredientsFields,
  } = useFieldArray({
    control,
    name: "ingredients" as never,
  })
  const addNewIngredient = () => {
    appendIngredient("")
  }
  const removeLastIngredient = () => {
    if (ingredientsFields.length > 1) removeIngredient(ingredientsFields.length - 1)
  }

  const {
    append: appendPreparation,
    remove: removePreparation,
    fields: preparationFields,
  } = useFieldArray({
    control,
    name: "preparation" as never,
  })
  const addNewPreparation = () => {
    appendPreparation("")
  }
  const removeLastPreparation = () => {
    if (preparationFields.length > 1) removePreparation(preparationFields.length - 1)
  }

  useLayoutEffect(() => {
    if (ingredientsFields.length === 0) addNewIngredient()
    if (preparationFields.length === 0) addNewPreparation()
  }, [])

  return (
    <View className="w-full" style={{ gap: Sizes.veryHuge }}>
      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          Nome da receita:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder="Digite o nome da receita"
            />
          )}
          {...register("name")}
        />
        <InputErrorMessage message={errors.name?.message} />
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          Descrição curta:
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder="Digite a descrição da receita"
              numberOfLines={4}
              multiline
            />
          )}
          {...register("description")}
        />
        <TextThemed size="body2" color="tertiary" font="nunitoSemiBold" classes="mt-1 text-right">
          {getValues("description")?.length ?? 0}/120 caracteres
        </TextThemed>
        <InputErrorMessage message={errors.description?.message} />
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          PANCs:
        </TextThemed>
        <Controller
          control={control}
          render={() => (
            <View style={{ gap: Sizes.tiny }}>
              {pancsFields.map((field, index) => (
                <Controller
                  key={field.id}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <SelectInput
                      save="value"
                      setSelected={onChange}
                      data={pancs.map((panc) => ({ key: panc.name, value: panc.name }))}
                      defaultOption={{
                        key: value ?? pancs.at(0)!.name,
                        value: value ?? pancs.at(0)!.name,
                      }}
                    />
                  )}
                  {...register(`pancs.${index}`)}
                />
              ))}
            </View>
          )}
          {...register("pancs")}
        />
        <InputErrorMessage message={errors.pancs?.root?.message} />

        <View className="w-full flex-row justify-end mt-2" style={{ gap: Sizes.micro }}>
          <ButtonThemed size="fit" color="alert" onClick={removeLastPanc}>
            <IonIcon name="remove-circle-outline" size="large" color="white" />
          </ButtonThemed>

          <ButtonThemed size="fit" color="secondary" onClick={addNewPanc}>
            <IonIcon name="add-circle-outline" size="large" color="white" />
          </ButtonThemed>
        </View>
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          Ingredientes:
        </TextThemed>
        <Controller
          control={control}
          render={() => (
            <View style={{ gap: Sizes.tiny }}>
              {ingredientsFields.map((field, index) => (
                <Controller
                  key={field.id}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      font="nunitoSemiBold"
                      placeholder="Exemplo: 1 colher de sal"
                    />
                  )}
                  {...register(`ingredients.${index}`)}
                />
              ))}
            </View>
          )}
          {...register("ingredients")}
        />
        <InputErrorMessage message={errors.ingredients?.root?.message} />

        <View className="w-full flex-row justify-end mt-2" style={{ gap: Sizes.micro }}>
          <ButtonThemed size="fit" color="alert" onClick={removeLastIngredient}>
            <IonIcon name="remove-circle-outline" size="large" color="white" />
          </ButtonThemed>

          <ButtonThemed size="fit" color="secondary" onClick={addNewIngredient}>
            <IonIcon name="add-circle-outline" size="large" color="white" />
          </ButtonThemed>
        </View>
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          Modo de preparo:
        </TextThemed>
        <Controller
          control={control}
          render={() => (
            <View style={{ gap: Sizes.tiny }}>
              {preparationFields.map((field, index) => (
                <Controller
                  key={field.id}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="w-full" style={{ gap: Sizes.micro }}>
                      <TextThemed color="primary" font="nunitoRegular">
                        {index + 1}° Passo
                      </TextThemed>
                      <Input
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        font="nunitoSemiBold"
                        placeholder="Exemplo: Misture todos os ingredientes secos"
                        numberOfLines={4}
                        multiline
                      />
                    </View>
                  )}
                  {...register(`preparation.${index}`)}
                />
              ))}
            </View>
          )}
          {...register("preparation")}
        />
        <InputErrorMessage message={errors.preparation?.root?.message} />

        <View className="w-full flex-row justify-end mt-2" style={{ gap: Sizes.micro }}>
          <ButtonThemed size="fit" color="alert" onClick={removeLastPreparation}>
            <IonIcon name="remove-circle-outline" size="large" color="white" />
          </ButtonThemed>

          <ButtonThemed size="fit" color="secondary" onClick={addNewPreparation}>
            <IonIcon name="add-circle-outline" size="large" color="white" />
          </ButtonThemed>
        </View>
      </View>

      <View className="w-full flex-row justify-between">
        <ButtonThemed color="alert" onClick={() => router.push("/(tabs)/user")} classes="w-[45%]">
          <TextThemed color="white" size="h4" font="nunitoBold">
            {data ? "Excluir" : "Cancelar"}
          </TextThemed>
        </ButtonThemed>

        <ButtonThemed color="secondary" onClick={handleSubmit(onSubmit)} classes="w-[45%]">
          <TextThemed color="white" size="h4" font="nunitoBold">
            Salvar
          </TextThemed>
        </ButtonThemed>
      </View>
    </View>
  )
}
