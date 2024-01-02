"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

import {
    Alert,
    AlertDescription,
    AlertTitle
} from "@/components/ui/alert"
    
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import { IngressInput } from "livekit-server-sdk"
import { ElementRef, useRef, useState, useTransition } from "react"
import { createIngress } from "@/actions/ingress"
import { toast } from "sonner"

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressInputTpe = typeof RTMP | typeof WHIP


const ConnectModal = () => {

    const closeRef = useRef<ElementRef<"button">>(null)
    const [ isPending, startTransition] = useTransition()
    const [ingressType, setIngressType] = useState<IngressInputTpe>(RTMP)

    const onSubmit = () => {
        startTransition( () => {
            createIngress(parseInt(ingressType))
            .then( () => {
                toast.success("Ingress Created")
                closeRef?.current?.click()
            })
            .catch(err => toast.error(`Failed to connect`))
        })
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={"primary"}>
                Generate Connection
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Generate a connection</DialogTitle>
            </DialogHeader>
            <Select
                disabled={isPending}
                value={ingressType}
                onValueChange={ value => setIngressType(value)}
            >
                <SelectTrigger className=" w-full">
                    <SelectValue placeholder="Ingress Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={RTMP}>RTMP</SelectItem>
                    <SelectItem value={WHIP}>WHIP</SelectItem>
                </SelectContent>
            </Select>
            <Alert>
                <AlertTriangle className=" h-4 w-4"/>
                <AlertTitle>Warning!</AlertTitle>
                <AlertDescription>
                    This action will reset all active streams using the current connection
                </AlertDescription>
            </Alert>
            <div className=" flex justify-between">
                <DialogClose 
                    ref={closeRef} asChild
                >
                    <Button  variant={"ghost"}>
                        Cancel
                    </Button>
                </DialogClose>
                <Button 
                    variant={"primary"} 
                    onClick={onSubmit}
                    disabled={isPending}
                >
                    Generate
                </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ConnectModal