/* eslint-disable @typescript-eslint/ban-types */
import { Type } from '@nestjs/common';
import { Configurator } from '../configuration/configurator';
import { Module } from '@nestjs/core/injector/module';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

export default class InvokedServiceHooker {
  public static resolveService(handlerClass: Type, handler: Function) {
    const classServiceProviders = this.extractServicesFromProviders(
      InvokedServiceHooker.getProviders(handlerClass),
    );

    return 'undefined';
  }

  private static getProviders(handlerClass: Type) {
    return Array.from(
      InvokedServiceHooker.getControllerModule(handlerClass).providers.values(),
    );
  }

  private static extractServicesFromProviders(providers: InstanceWrapper[]) {
    return providers.filter((provider: InstanceWrapper) =>
      (provider.name as string).toLowerCase().includes('service'),
    );
  }

  private static getControllerModule(handlerClass: Type): Module {
    return (Configurator.nestApp as any)._moduleRefsForHooksByDistance.find(
      (module: Module) => module.controllers.get(handlerClass),
    );
  }

  private static getInvokedService(handler: Function) {
    const returnMatches = handler.toString().match(/return this.(\w+)/);
    return returnMatches[returnMatches.length - 1];
  }

  private static getTypeOfUsedVar(usedVarName: string, handlerClass: Type) {
    const returnMatches = handlerClass
      .toString()
      .match(new RegExp(`${usedVarName}: (\w+)`));
    return returnMatches[returnMatches.length - 1];
  }
}
