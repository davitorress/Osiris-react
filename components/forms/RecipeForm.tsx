import { View } from "react-native"
import { useFocusEffect } from "expo-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useLayoutEffect, useMemo } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"

import usePancStore from "@/storage/panc"
import { RecipeData, recipeSchema } from "./types"
import useTranslationStore from "@/storage/translation"

import Sizes from "@/constants/Sizes"
import Input from "@/components/basic/Input"
import IonIcon from "@/components/basic/IonIcon"
import TextThemed from "@/components/themed/TextThemed"
import SelectInput from "@/components/basic/SelectInput"
import ButtonThemed from "@/components/themed/ButtonThemed"
import InputErrorMessage from "@/components/basic/InputErrorMessage"

interface RecipeFormProps {
  data?: RecipeData
  onCancel: () => void
  onSubmit: (data: RecipeData) => void
}

export default function RecipeForm({ data, onCancel, onSubmit }: RecipeFormProps) {
  const { pancs } = usePancStore()
  const translate = useTranslationStore((state) => state.actions.translate)

  const {
    watch,
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeData>({
    values: data,
    defaultValues: data ?? {
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
    replace: replacePancs,
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
    replace: replaceIngredients,
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
    replace: replacePreparation,
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

  const [description] = watch(["description"])
  const descriptionCounter = useMemo(() => {
    const characters = description?.length ?? 0
    const limit = 250

    return translate("form.recipeDescriptionLength", { count: characters, limit })
  }, [description])

  useLayoutEffect(() => {
    if (ingredientsFields.length === 0) addNewIngredient()
    if (preparationFields.length === 0) addNewPreparation()

    if (data?.pancs) replacePancs(data.pancs)
    if (data?.ingredients) replaceIngredients(data.ingredients)
    if (data?.preparation) replacePreparation(data.preparation)
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (!data) {
        reset({
          name: "",
          description: "",
          ingredients: [""],
          preparation: [""],
          pancs: [pancs.at(0)!.name],
        })
      }

      return () => {
        if (!data) {
          reset({
            name: "",
            description: "",
            ingredients: [""],
            preparation: [""],
            pancs: [pancs.at(0)!.name],
          })
        }
      }
    }, [data, reset, pancs])
  )

  return (
    <View className="w-full" style={{ gap: Sizes.veryHuge }}>
      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          {translate("form.recipeName")}
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder={translate("form.placeholder.recipeName")}
            />
          )}
          {...register("name")}
        />
        <InputErrorMessage message={errors.name?.message} />
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          {translate("form.recipeDescription")}
        </TextThemed>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              font="nunitoSemiBold"
              placeholder={translate("form.placeholder.recipeDescription")}
              numberOfLines={4}
              multiline
            />
          )}
          {...register("description")}
        />
        <TextThemed size="body2" color="tertiary" font="nunitoSemiBold" classes="mt-1 text-right">
          {descriptionCounter}
        </TextThemed>
        <InputErrorMessage message={errors.description?.message} />
      </View>

      <View className="w-full">
        <TextThemed color="primary" size="h4" font="nunitoRegular" classes="mb-2">
          {translate("form.recipePancs")}
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
          {translate("form.recipeIngredients")}
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
                      placeholder={translate("form.placeholder.recipeIngredients")}
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
          {translate("form.recipePreparation")}
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
                        {translate("form.recipePreparationStep", { count: index + 1 })}
                      </TextThemed>
                      <Input
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        font="nunitoSemiBold"
                        placeholder={translate("form.placeholder.recipePreparation")}
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
        <ButtonThemed color="alert" onClick={onCancel} classes="w-[45%]">
          <TextThemed color="white" size="h4" font="nunitoBold">
            {data ? translate("actions.delete") : translate("actions.cancel")}
          </TextThemed>
        </ButtonThemed>

        <ButtonThemed color="secondary" onClick={handleSubmit(onSubmit)} classes="w-[45%]">
          <TextThemed color="white" size="h4" font="nunitoBold">
            {translate("actions.save")}
          </TextThemed>
        </ButtonThemed>
      </View>
    </View>
  )
}
