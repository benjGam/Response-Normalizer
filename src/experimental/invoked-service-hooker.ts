/* eslint-disable @typescript-eslint/ban-types */
import { Type } from '@nestjs/common';
import { Configurator } from '../configuration/configurator';
import { Module } from '@nestjs/core/injector/module';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

export default class InvokedServiceHooker {
  public static resolveService(handlerClass: Type, handler: Function) {
    const classProviders = InvokedServiceHooker.getProviders(handlerClass);

    return 'undefined';
  }

  private static getProviders(handlerClass: Type) {
    return Array.from(
      InvokedServiceHooker.getControllerModule(handlerClass).providers.values(),
    );
  }

  private static getControllerModule(handlerClass: Type): Module {
    return (Configurator.nestApp as any)._moduleRefsForHooksByDistance.find(
      (module: Module) => module.controllers.get(handlerClass),
    );
  }
}
