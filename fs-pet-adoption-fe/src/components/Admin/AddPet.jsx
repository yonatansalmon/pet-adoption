import React from 'react'
import { Checkbox, Textarea, Button, Select, Input, Stack, InputGroup, InputLeftElement, FormControl, FormLabel, Text, Box, Spacer } from '@chakra-ui/react'
import { useState, useContext } from 'react'
import { NumberInput, List, ListItem, ListIcon, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { SmallCloseIcon, MinusIcon } from '@chakra-ui/icons'
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { AdminContextInstance } from '../../context/AdminContext'

function AddPet() {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [breed, setBreed] = useState("")
    const [adoptionStatus, setAdoptionStatus] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [color, setColor] = useState("")
    const [bio, setBio] = useState("")
    const [hypoallergenic, setHypoallergenic] = useState(false)
    const [diet, setDiet] = useState("")
    const [dietArray, setDietArray] = useState([])
    const [image, setImage] = useState("")
    const [checkForm, setCheckForm] = useState(false)
    const toast = useToast();


    const { isLoading, setIsLoading } = useContext(AdminContextInstance);


    const addItem = () => {
        const newItem = diet;
        setDietArray(prevItems => [...prevItems, newItem]);
    };


    const removeFromDietList = (item) => {
        const newArray = dietArray.filter((dietItem) => dietItem !== item)
        setDietArray(newArray)
    }


    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('picture', image);
        formData.append('type', type);
        formData.append('adoptionStatus', adoptionStatus);
        formData.append('name', name);
        formData.append('breed', breed);
        formData.append('color', color);
        formData.append('height', height);
        formData.append('weight', weight);
        formData.append('bio', bio);
        formData.append('hypoallergenic', hypoallergenic);
        formData.append('dietery', dietArray);
        registerPet(formData)
    }


    const registerPet = async (formData) => {
          try {
            setIsLoading(true)
            const res = await axios.post('http://localhost:8080/admin/addpet', formData, {withCredentials: true});
            if (res.data) {
                setIsLoading(false)
                toast({
                    title: res.data.name + " is now registered!",
                    description: res.data.name + " the " + res.data.type + " was added succsufly!" ,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  })
            }
        }
        catch (err) {
            setIsLoading(false)
            console.error(err.message);
        }
    }




    return (

        <div className='main-container'>
            <Stack minW='10em' spacing={4} width={['100%', '90%', '80%']} align='center'
                maxW={500}>
                <Text
                    bgGradient='linear(to-r, teal.500, purple.500)'
                    bgClip='text'
                    fontSize='4xl'
                    fontWeight='extrabold'
                    mb={6}
                >
                    Add a pet
                </Text>


                <FormControl mt={4} isRequired>
                    <FormLabel className='font'>Type:</FormLabel>
                    <InputGroup className='font'>

                        <Select name='type' value={type} onChange={(e) => setType(e.target.value)} variant='filled'>
                            <option value=''>Pick a type</option>
                            <option value='Dog'>Dog</option>
                            <option value='Cat'>Cat</option>
                            <option value='Other'>Other</option>
                        </Select>
                    </InputGroup>
                </FormControl>


                <FormControl mt={4} isRequired>
                    <FormLabel className='font'>Name:</FormLabel>
                    <Input className='font' placeholder="Enter the pet's name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </FormControl>



                <FormControl mt={4}>
                    <FormLabel className='font'>Breed:</FormLabel>
                    <InputGroup className='font'>
                        <Input placeholder="Enter the pet's breed"
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)} />
                    </InputGroup>
                </FormControl>

                <FormControl mt={4} isRequired>
                    <FormLabel className='font'>Adoption Status:</FormLabel>

                    <InputGroup className='font'>
                        <Select name='status' onChange={(e) => setAdoptionStatus(e.target.value)} value={adoptionStatus} variant='filled'>
                            <option value=''>Adoption status</option>
                            <option value='Available'>Available</option>
                            <option value='Fostered'>Fostered</option>
                            <option value='Adopted'>Adopted</option>
                        </Select>
                    </InputGroup>
                </FormControl>


                <FormControl isRequired mt={4}>
                    <InputGroup className='font' alignItems='center'>
                        <FormLabel className='font'>Height (Cm):
                        </FormLabel>
                        <NumberInput name='height' value={height}
                            onChange={(e) => setHeight(e)} allowMouseWheel min={1} size='md' variant='filled' type='number' >
                            <NumberInputField />
                            <NumberInputStepper >
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </InputGroup>
                </FormControl>

                <FormControl isRequired mt={4}>

                    <InputGroup className='font' alignItems='center'>
                        <FormLabel>Weight (Kg): </FormLabel>
                        <NumberInput name='weight' value={weight}
                            onChange={(e) => setWeight(e)}
                            colorScheme='purple' allowMouseWheel size='md' min={1} className='font' variant='filled' type='number' >
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </InputGroup>
                </FormControl>



                <FormControl mt={4}>
                    <FormLabel className='font'>Color:</FormLabel>
                    <InputGroup className='font'>
                        <Input placeholder="Pet's color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)} />
                    </InputGroup>
                </FormControl>

                <FormControl mt={4}>
                    <InputGroup className='font'>
                        <Checkbox onChange={(e) => setHypoallergenic(!hypoallergenic)} size='md' colorScheme='purple' >
                            Pet is hypoallergenic
                        </Checkbox>
                    </InputGroup>

                </FormControl>

                <FormControl mt={4}>
                    <FormLabel className='font'>Bio</FormLabel>
                    <InputGroup className='font'>
                        <Textarea placeholder="Enter the pet's bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)} />
                    </InputGroup>
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel className='font'>Enter the pet's dietary restrictions:</FormLabel>
                    <InputGroup className='font'>
                        <Input placeholder="Add one dietary restriction"
                            value={diet}
                            onChange={(e) => setDiet(e.target.value)} />
                        <Button ml={2} fontWeight='light' fontSize={15} onClick={addItem}>Add Restriction</Button>
                    </InputGroup>


                    <Text mt={3} colorScheme='red' className='font'>{dietArray && `Dietary Restrictions Submitted:`}</Text>

                    <List spacing={3}>

                        {dietArray.map(item => (
                            <ListItem key={item}>
                                <IconButton onClick={(e) => removeFromDietList(item)} w={1} mr={3} boxSize={5} aria-label='Search database' icon={<MinusIcon />} colorScheme='red' />

                                {item}  </ListItem>
                        ))}
                    </List>
                </FormControl>



                <FormControl mt={4}>
                    <FormLabel className='font'>Upload an image:</FormLabel>
                    <input type='file' variant='filled' onChange={(e) => setImage(e.target.files[0])} />
                </FormControl>


                {/* <div className='errorMsg'>{errorMsgClient}</div> */}

                <Button  onClick={handleSubmit} className='font' color='white' bgGradient='linear(to-r, teal.500, purple.500)'
                    _hover={{
                        bgGradient: 'linear(to-r, teal.200, purple.200)',
                    }}
                    
                    isLoading={isLoading}
              loadingText='Saving'
              colorScheme='teal'
              variant='outline'
              spinnerPlacement='start'
                    
                    
                    >
                    Register a New Pet</Button>

            </Stack>

        </div>

    )
}

export default AddPet

